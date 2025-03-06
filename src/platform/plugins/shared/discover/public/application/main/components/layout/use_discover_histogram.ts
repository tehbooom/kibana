/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { useQuerySubscriber } from '@kbn/unified-field-list/src/hooks/use_query_subscriber';
import {
  canImportVisContext,
  UnifiedHistogramApi,
  UnifiedHistogramContainerProps,
  UnifiedHistogramCreationOptions,
  UnifiedHistogramExternalVisContextStatus,
  UnifiedHistogramFetchStatus,
  UnifiedHistogramState,
  UnifiedHistogramVisContext,
} from '@kbn/unified-histogram-plugin/public';
import { isEqual } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  pairwise,
  skip,
  startWith,
} from 'rxjs';
import useObservable from 'react-use/lib/useObservable';
import type { RequestAdapter } from '@kbn/inspector-plugin/common';
import type { Datatable, DatatableColumn } from '@kbn/expressions-plugin/common';
import type { SavedSearch } from '@kbn/saved-search-plugin/common';
import { Filter, isOfAggregateQueryType } from '@kbn/es-query';
import { ESQL_TABLE_TYPE } from '@kbn/data-plugin/common';
import { useDiscoverCustomization } from '../../../../customizations';
import { useDiscoverServices } from '../../../../hooks/use_discover_services';
import { FetchStatus } from '../../../types';
import type { InspectorAdapters } from '../../hooks/use_inspector';
import { checkHitCount, sendErrorTo } from '../../hooks/use_saved_search_messages';
import type { DiscoverStateContainer } from '../../state_management/discover_state';
import { addLog } from '../../../../utils/add_log';
import {
  useAppStateSelector,
  type DiscoverAppState,
} from '../../state_management/discover_app_state_container';
import { DataDocumentsMsg } from '../../state_management/discover_data_state_container';
import { useSavedSearch } from '../../state_management/discover_state_provider';
import { useIsEsqlMode } from '../../hooks/use_is_esql_mode';
import {
  internalStateActions,
  useCurrentDataView,
  useInternalStateDispatch,
  useInternalStateSelector,
} from '../../state_management/redux';

const EMPTY_ESQL_COLUMNS: DatatableColumn[] = [];
const EMPTY_FILTERS: Filter[] = [];

export interface UseDiscoverHistogramProps {
  stateContainer: DiscoverStateContainer;
  inspectorAdapters: InspectorAdapters;
  hideChart: boolean | undefined;
}

export const useDiscoverHistogram = ({
  stateContainer,
  inspectorAdapters,
  hideChart,
}: UseDiscoverHistogramProps): Omit<
  UnifiedHistogramContainerProps,
  'container' | 'getCreationOptions'
> & {
  ref: (api: UnifiedHistogramApi | null) => void;
  getCreationOptions: () => UnifiedHistogramCreationOptions;
} => {
  const services = useDiscoverServices();
  const { main$, documents$, totalHits$ } = stateContainer.dataState.data$;
  const savedSearchState = useSavedSearch();
  const isEsqlMode = useIsEsqlMode();

  /**
   * API initialization
   */

  const [unifiedHistogram, ref] = useState<UnifiedHistogramApi | null>();
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);

  const getCreationOptions = useCallback(() => {
    const { hideChart: chartHidden, interval: timeInterval } = stateContainer.appState.getState();

    return {
      localStorageKeyPrefix: 'discover',
      disableAutoFetching: true,
      initialState: {
        chartHidden,
        timeInterval,
        totalHitsStatus: UnifiedHistogramFetchStatus.loading,
        totalHitsResult: undefined,
      },
    };
  }, [stateContainer.appState]);

  /**
   * Sync Unified Histogram state with Discover state
   */

  useEffect(() => {
    const subscription = createUnifiedHistogramStateObservable(unifiedHistogram?.state$)?.subscribe(
      (changes) => {
        const { lensRequestAdapter, ...stateChanges } = changes;
        const appState = stateContainer.appState.getState();
        const oldState = {
          hideChart: appState.hideChart,
          interval: appState.interval,
        };
        const newState = { ...oldState, ...stateChanges };

        if ('lensRequestAdapter' in changes) {
          inspectorAdapters.lensRequests = lensRequestAdapter;
        }

        if (!isEqual(oldState, newState)) {
          stateContainer.appState.update(newState);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [inspectorAdapters, stateContainer.appState, unifiedHistogram?.state$]);

  /**
   * Sync URL query params with Unified Histogram
   */

  useEffect(() => {
    const subscription = createAppStateObservable(stateContainer.appState.state$).subscribe(
      (changes) => {
        if ('timeInterval' in changes && changes.timeInterval) {
          unifiedHistogram?.setTimeInterval(changes.timeInterval);
        }

        if ('chartHidden' in changes && typeof changes.chartHidden === 'boolean') {
          unifiedHistogram?.setChartHidden(changes.chartHidden);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [stateContainer.appState.state$, unifiedHistogram]);

  /**
   * Total hits
   */

  const setTotalHitsError = useMemo(() => sendErrorTo(totalHits$), [totalHits$]);

  useEffect(() => {
    const subscription = createTotalHitsObservable(unifiedHistogram?.state$)?.subscribe(
      ({ status, result }) => {
        if (isEsqlMode) {
          // ignore histogram's total hits updates for ES|QL as Discover manages them during docs fetching
          return;
        }

        if (result instanceof Error) {
          // Set totalHits$ to an error state
          setTotalHitsError(result);
          return;
        }

        const { result: totalHitsResult } = totalHits$.getValue();

        if (
          (status === UnifiedHistogramFetchStatus.loading ||
            status === UnifiedHistogramFetchStatus.uninitialized) &&
          totalHitsResult &&
          typeof result !== 'number'
        ) {
          // ignore the histogram initial loading state if discover state already has a total hits value
          return;
        }

        const fetchStatus = status.toString() as FetchStatus;

        // Do not sync the loading state since it's already handled by fetchAll
        if (fetchStatus !== FetchStatus.LOADING) {
          totalHits$.next({
            fetchStatus,
            result,
          });
        }

        if (status !== UnifiedHistogramFetchStatus.complete || typeof result !== 'number') {
          return;
        }

        // Check the hits count to set a partial or no results state
        checkHitCount(main$, result);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [
    isEsqlMode,
    main$,
    totalHits$,
    setTotalHitsError,
    stateContainer.appState,
    unifiedHistogram?.state$,
  ]);

  /**
   * Request params
   */
  const { query, filters } = useQuerySubscriber({ data: services.data });
  const requestParams = useInternalStateSelector((state) => state.dataRequestParams);
  const { timeRangeRelative: relativeTimeRange, timeRangeAbsolute: timeRange } = requestParams;
  // When in ES|QL mode, update the data view, query, and
  // columns only when documents are done fetching so the Lens suggestions
  // don't frequently change, such as when the user modifies the table
  // columns, which would trigger unnecessary refetches.
  const esqlFetchComplete$ = useMemo(
    () => createFetchCompleteObservable(stateContainer),
    [stateContainer]
  );

  const [initialEsqlProps] = useState(() =>
    getUnifiedHistogramPropsForEsql({
      documentsValue: documents$.getValue(),
      savedSearch: stateContainer.savedSearchState.getState(),
    })
  );

  const {
    dataView: esqlDataView,
    query: esqlQuery,
    columns: esqlColumns,
    table,
  } = useObservable(esqlFetchComplete$, initialEsqlProps);

  useEffect(() => {
    if (!isEsqlMode) {
      setIsSuggestionLoading(false);
      return;
    }

    const fetchStart = stateContainer.dataState.fetchChart$.subscribe(() => {
      setIsSuggestionLoading(true);
    });
    const fetchComplete = esqlFetchComplete$.subscribe(() => {
      setIsSuggestionLoading(false);
    });

    return () => {
      fetchStart.unsubscribe();
      fetchComplete.unsubscribe();
    };
  }, [isEsqlMode, stateContainer.dataState.fetchChart$, esqlFetchComplete$]);

  /**
   * Data fetching
   */

  // Handle unified histogram refetching
  useEffect(() => {
    if (!unifiedHistogram) {
      return;
    }

    let fetchChart$: Observable<string>;

    // When in ES|QL mode, we refetch under two conditions:
    // 1. When the current Lens suggestion changes. This syncs the visualization
    //    with the user's selection.
    // 2. When the documents are done fetching. This is necessary because we don't
    //    have access to the latest columns until after the documents are fetched,
    //    which are required to get the latest Lens suggestion, which would trigger
    //    a refetch anyway and result in multiple unnecessary fetches.
    if (isEsqlMode) {
      fetchChart$ = merge(
        createCurrentSuggestionObservable(unifiedHistogram.state$).pipe(map(() => 'lens')),
        esqlFetchComplete$.pipe(map(() => 'discover'))
      ).pipe(debounceTime(50));
    } else {
      fetchChart$ = stateContainer.dataState.fetchChart$.pipe(map(() => 'discover'));
    }

    const subscription = fetchChart$.subscribe((source) => {
      if (source === 'discover') addLog('Unified Histogram - Discover refetch');
      if (source === 'lens') addLog('Unified Histogram - Lens suggestion refetch');
      unifiedHistogram.fetch();
    });

    // triggering the initial chart request
    if (!isEsqlMode) {
      unifiedHistogram.fetch();
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [isEsqlMode, stateContainer.dataState.fetchChart$, esqlFetchComplete$, unifiedHistogram]);

  const dataView = useCurrentDataView();

  const histogramCustomization = useDiscoverCustomization('unified_histogram');

  const filtersMemoized = useMemo(() => {
    const allFilters = [...(filters ?? [])];
    return allFilters.length ? allFilters : EMPTY_FILTERS;
  }, [filters]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const timeRangeMemoized = useMemo(() => timeRange, [timeRange?.from, timeRange?.to]);
  const dispatch = useInternalStateDispatch();

  const onVisContextChanged = useCallback(
    (
      nextVisContext: UnifiedHistogramVisContext | undefined,
      externalVisContextStatus: UnifiedHistogramExternalVisContextStatus
    ) => {
      switch (externalVisContextStatus) {
        case UnifiedHistogramExternalVisContextStatus.manuallyCustomized:
          // if user customized the visualization manually
          // (only this action should trigger Unsaved changes badge)
          stateContainer.savedSearchState.updateVisContext({
            nextVisContext,
          });
          dispatch(internalStateActions.setOverriddenVisContextAfterInvalidation(undefined));
          break;
        case UnifiedHistogramExternalVisContextStatus.automaticallyOverridden:
          // if the visualization was invalidated as incompatible and rebuilt
          // (it will be used later for saving the visualization via Save button)
          dispatch(internalStateActions.setOverriddenVisContextAfterInvalidation(nextVisContext));
          break;
        case UnifiedHistogramExternalVisContextStatus.automaticallyCreated:
        case UnifiedHistogramExternalVisContextStatus.applied:
          // clearing the value in the internal state so we don't use it during saved search saving
          dispatch(internalStateActions.setOverriddenVisContextAfterInvalidation(undefined));
          break;
        case UnifiedHistogramExternalVisContextStatus.unknown:
          // using `{}` to overwrite the value inside the saved search SO during saving
          dispatch(internalStateActions.setOverriddenVisContextAfterInvalidation({}));
          break;
      }
    },
    [dispatch, stateContainer.savedSearchState]
  );

  const breakdownField = useAppStateSelector((state) => state.breakdownField);

  const onBreakdownFieldChange = useCallback<
    NonNullable<UnifiedHistogramContainerProps['onBreakdownFieldChange']>
  >(
    (nextBreakdownField) => {
      if (nextBreakdownField !== breakdownField) {
        stateContainer.appState.update({ breakdownField: nextBreakdownField });
      }
    },
    [breakdownField, stateContainer.appState]
  );

  return {
    ref,
    getCreationOptions,
    services,
    dataView: isEsqlMode ? esqlDataView : dataView,
    query: isEsqlMode ? esqlQuery : query,
    filters: filtersMemoized,
    timeRange: timeRangeMemoized,
    relativeTimeRange,
    columns: isEsqlMode ? esqlColumns : undefined,
    table: isEsqlMode ? table : undefined,
    onFilter: histogramCustomization?.onFilter,
    onBrushEnd: histogramCustomization?.onBrushEnd,
    withDefaultActions: histogramCustomization?.withDefaultActions,
    disabledActions: histogramCustomization?.disabledActions,
    isChartLoading: isSuggestionLoading,
    // visContext should be in sync with current query
    externalVisContext:
      isEsqlMode && canImportVisContext(savedSearchState?.visContext)
        ? savedSearchState?.visContext
        : undefined,
    onVisContextChanged: isEsqlMode ? onVisContextChanged : undefined,
    breakdownField,
    onBreakdownFieldChange,
  };
};

// Use pairwise to diff the previous and current state (starting with undefined to ensure
// pairwise triggers after a single emission), and return an object containing only the
// changed properties. By only including the changed properties, we avoid accidentally
// overwriting other state properties that may have been updated between the time this
// obersverable was triggered and the time the state changes are applied.
const createUnifiedHistogramStateObservable = (state$?: Observable<UnifiedHistogramState>) => {
  return state$?.pipe(
    startWith(undefined),
    pairwise(),
    map(([prev, curr]) => {
      const changes: Partial<DiscoverAppState> & { lensRequestAdapter?: RequestAdapter } = {};

      if (!curr) {
        return changes;
      }

      if (prev?.lensRequestAdapter !== curr.lensRequestAdapter) {
        changes.lensRequestAdapter = curr.lensRequestAdapter;
      }

      if (prev?.chartHidden !== curr.chartHidden) {
        changes.hideChart = curr.chartHidden;
      }

      if (prev?.timeInterval !== curr.timeInterval) {
        changes.interval = curr.timeInterval;
      }

      return changes;
    }),
    filter((changes) => Object.keys(changes).length > 0)
  );
};

const createAppStateObservable = (state$: Observable<DiscoverAppState>) => {
  return state$.pipe(
    startWith(undefined),
    pairwise(),
    map(([prev, curr]) => {
      const changes: Partial<UnifiedHistogramState> = {};

      if (!curr) {
        return changes;
      }

      if (prev?.interval !== curr.interval) {
        changes.timeInterval = curr.interval;
      }

      if (prev?.hideChart !== curr.hideChart) {
        changes.chartHidden = curr.hideChart;
      }

      return changes;
    }),
    filter((changes) => Object.keys(changes).length > 0)
  );
};

const createFetchCompleteObservable = (stateContainer: DiscoverStateContainer) => {
  return stateContainer.dataState.data$.documents$.pipe(
    distinctUntilChanged((prev, curr) => prev.fetchStatus === curr.fetchStatus),
    filter(({ fetchStatus }) => [FetchStatus.COMPLETE, FetchStatus.ERROR].includes(fetchStatus)),
    map((documentsValue) => {
      return getUnifiedHistogramPropsForEsql({
        documentsValue,
        savedSearch: stateContainer.savedSearchState.getState(),
      });
    })
  );
};

const createTotalHitsObservable = (state$?: Observable<UnifiedHistogramState>) => {
  return state$?.pipe(
    map((state) => ({ status: state.totalHitsStatus, result: state.totalHitsResult })),
    distinctUntilChanged((prev, curr) => prev.status === curr.status && prev.result === curr.result)
  );
};

const createCurrentSuggestionObservable = (state$: Observable<UnifiedHistogramState>) => {
  return state$.pipe(
    map((state) => state.currentSuggestionContext),
    distinctUntilChanged(isEqual),
    // Skip the first emission since it's the
    // initial state and doesn't need a refetch
    skip(1)
  );
};

function getUnifiedHistogramPropsForEsql({
  documentsValue,
  savedSearch,
}: {
  documentsValue: DataDocumentsMsg | undefined;
  savedSearch: SavedSearch;
}) {
  const columns = documentsValue?.esqlQueryColumns || EMPTY_ESQL_COLUMNS;
  const query = savedSearch.searchSource.getField('query');
  const isEsqlMode = isOfAggregateQueryType(query);
  const table: Datatable | undefined =
    isEsqlMode && documentsValue?.result
      ? {
          type: 'datatable',
          rows: documentsValue.result.map((r) => r.raw),
          columns,
          meta: { type: ESQL_TABLE_TYPE },
        }
      : undefined;

  const nextProps = {
    dataView: savedSearch.searchSource.getField('index')!,
    query: savedSearch.searchSource.getField('query'),
    columns,
    table,
  };

  addLog('[UnifiedHistogram] delayed next props for ES|QL', nextProps);

  return nextProps;
}
