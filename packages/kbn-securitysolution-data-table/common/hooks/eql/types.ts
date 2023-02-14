/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Unit } from '@kbn/datemath';

import type { InspectResponse } from '../../../types';
import type { ChartData } from '../../components/charts/common';
import type { inputsModel } from '../../store';

export interface EqlPreviewRequest {
  to: string;
  from: string;
  interval: Unit;
  query: string;
  index: string[];
}

export interface EqlPreviewResponse {
  data: ChartData[];
  totalCount: number;
  inspect: InspectResponse;
  refetch: inputsModel.Refetch;
}

export interface Source {
  '@timestamp': string | number;
}
