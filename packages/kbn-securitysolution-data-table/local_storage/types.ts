/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { DataTableModel } from '../store/model';
import type { TableIdLiteral } from '../../../../common/types';

export interface DataTablesStorage {
  getAllDataTables: () => Record<TableIdLiteral, DataTableModel>;
  getDataTablesById: (id: TableIdLiteral) => DataTableModel | null;
  addDataTable: (id: TableIdLiteral, table: DataTableModel) => void;
}
