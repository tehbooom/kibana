/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { ResponseErrorAttributes } from '@kbn/core/server';
import type { DataViewBase } from '@kbn/es-query';
import type { FieldSpec } from '@kbn/data-views-plugin/common';

export interface ServerApiError {
  statusCode: number;
  error: string;
  message: string;
  attributes?: ResponseErrorAttributes | undefined;
}

export interface SecuritySolutionUiConfigType {
  enableExperimental: string[];
  prebuiltRulesPackageVersion?: string;
}

/**
 * DataViewBase with enhanced index fields used in timelines
 */
export interface SecuritySolutionDataViewBase extends DataViewBase {
  fields: FieldSpec[];
  getName?: () => string;
}

export type AlertWorkflowStatus = 'open' | 'closed' | 'acknowledged';
export type Refetch = () => void;
