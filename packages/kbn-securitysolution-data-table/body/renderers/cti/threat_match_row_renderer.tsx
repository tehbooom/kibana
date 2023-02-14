/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { RowRenderer } from '../../../types/timeline';
import { RowRendererId } from '../../../types/timeline';
import { hasThreatMatchValue } from './helpers';
import { ThreatMatchRows } from './threat_match_rows';

export const threatMatchRowRenderer: RowRenderer = {
  id: RowRendererId.threat_match,
  isInstance: hasThreatMatchValue,
  renderRow: ThreatMatchRows,
};
