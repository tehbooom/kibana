/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { TypeOf } from '@kbn/config-schema';
import type { RuleParamsV1, RuleResponseV1 } from '../../../response';
import type { getRuleRequestParamsSchemaV1 } from '..';

export type GetRuleRequestParams = TypeOf<typeof getRuleRequestParamsSchemaV1>;

export interface GetRuleResponse<Params extends RuleParamsV1 = never> {
  body: RuleResponseV1<Params>;
}
