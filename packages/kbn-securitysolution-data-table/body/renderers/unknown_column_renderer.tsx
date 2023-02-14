/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { getEmptyTagValue } from '../../../../../common/components/empty_value';
import type { ColumnRenderer } from './column_renderer';

export const unknownColumnRenderer: ColumnRenderer = {
  isInstance: () => true,
  renderColumn: () => getEmptyTagValue(),
};
