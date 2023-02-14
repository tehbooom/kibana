/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { TimelineNonEcsData } from '../../../../../../common/search_strategy/timeline';
import type { ColumnRenderer } from './column_renderer';

const unhandledColumnRenderer = (): never => {
  throw new Error('Unhandled Column Renderer');
};

export const getColumnRenderer = (
  columnName: string,
  columnRenderers: ColumnRenderer[],
  data: TimelineNonEcsData[]
): ColumnRenderer => {
  const renderer = columnRenderers.find((columnRenderer) =>
    columnRenderer.isInstance(columnName, data)
  );
  return renderer != null ? renderer : unhandledColumnRenderer();
};
