/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useMemo } from 'react';
import { queriesSelector } from '../components/super_date_picker/selectors';
import type { State, inputsModel } from '../store';
import { InputsModelId } from '../store/inputs/constants';
import { useDeepEqualSelector } from './use_selector';

export const useRefetchQueries = () => {
  const getQueriesSelector = useMemo(() => queriesSelector(), []);
  const queries = useDeepEqualSelector((state: State) =>
    getQueriesSelector(state, InputsModelId.global)
  );

  const refetchPage = useCallback(() => {
    queries.forEach((q) => q.refetch && (q.refetch as inputsModel.Refetch)());
  }, [queries]);

  return refetchPage;
};
