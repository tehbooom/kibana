/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useSyncGlobalQueryString } from '../utils/global_query_string';
import { useInitSearchBarFromUrlParams } from './search_bar/use_init_search_bar_url_params';
import { useInitTimerangeFromUrlParam } from './search_bar/use_init_timerange_url_params';
import { useUpdateTimerangeOnPageChange } from './search_bar/use_update_timerange_on_page_change';
import { useInitTimelineFromUrlParam } from './timeline/use_init_timeline_url_param';
import { useSyncTimelineUrlParam } from './timeline/use_sync_timeline_url_param';
import { useQueryTimelineByIdOnUrlChange } from './timeline/use_query_timeline_by_id_on_url_change';

export const useUrlState = () => {
  useSyncGlobalQueryString();
  useInitSearchBarFromUrlParams();
  useInitTimerangeFromUrlParam();
  useUpdateTimerangeOnPageChange();
  useInitTimelineFromUrlParam();
  useSyncTimelineUrlParam();
  useQueryTimelineByIdOnUrlChange();
};

export enum URL_PARAM_KEY {
  appQuery = 'query',
  filters = 'filters',
  savedQuery = 'savedQuery',
  sourcerer = 'sourcerer',
  timeline = 'timeline',
  timerange = 'timerange',
  pageFilter = 'pageFilters',
  rulesTable = 'rulesTable',
}
