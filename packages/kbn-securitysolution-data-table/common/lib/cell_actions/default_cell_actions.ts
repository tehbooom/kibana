/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { DataTableCellAction } from '../../../../common/types';
import { getFilterForCellAction } from './filter_for';
import { getFilterOutCellAction } from './filter_out';
import { getAddToTimelineCellAction } from './add_to_timeline';
import { getCopyCellAction } from './copy';
import { FieldValueCell } from './field_value';

export const cellActions: DataTableCellAction[] = [
  getFilterForCellAction,
  getFilterOutCellAction,
  getAddToTimelineCellAction,
  getCopyCellAction,
  FieldValueCell,
];

/** the default actions shown in `EuiDataGrid` cells */
export const defaultCellActions = [...cellActions];
