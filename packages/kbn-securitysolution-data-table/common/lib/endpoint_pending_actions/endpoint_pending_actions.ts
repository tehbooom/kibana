/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type {
  PendingActionsRequestQuery,
  PendingActionsResponse,
} from '../../../../common/endpoint/types';
import { KibanaServices } from '../kibana';
import { ACTION_STATUS_ROUTE } from '../../../../common/endpoint/constants';

/**
 * Retrieve a list of pending actions against the given Fleet Agent Ids provided on input
 * @param agentIds
 */
export const fetchPendingActionsByAgentId = (
  agentIds: PendingActionsRequestQuery['agent_ids']
): Promise<PendingActionsResponse> => {
  return KibanaServices.get().http.get<PendingActionsResponse>(ACTION_STATUS_ROUTE, {
    query: {
      agent_ids: agentIds,
    },
  });
};
