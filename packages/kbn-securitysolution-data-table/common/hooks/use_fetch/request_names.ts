/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { APP_UI_ID } from '../../../../common/constants';

export const REQUEST_NAMES = {
  SECURITY_DASHBOARDS: `${APP_UI_ID} fetch security dashboards`,
  ANOMALIES_TABLE: `${APP_UI_ID} fetch anomalies table data`,
  GET_RISK_SCORE_DEPRECATED: `${APP_UI_ID} fetch is risk score deprecated`,
  ENABLE_RISK_SCORE: `${APP_UI_ID} fetch enable risk score`,
  REFRESH_RISK_SCORE: `${APP_UI_ID} fetch refresh risk score`,
  UPGRADE_RISK_SCORE: `${APP_UI_ID} fetch upgrade risk score`,
} as const;

export type RequestName = typeof REQUEST_NAMES[keyof typeof REQUEST_NAMES];
