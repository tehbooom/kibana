/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { get } from 'lodash/fp';
import React from 'react';

import type { RowRenderer } from '../../../types/timeline';
import { RowRendererId } from '../../../types/timeline';

import { RowRendererContainer } from '../row_renderer';
import { ZeekDetails } from './zeek_details';

export const zeekRowRenderer: RowRenderer = {
  id: RowRendererId.zeek,
  isInstance: (ecs) => {
    const module: string | null | undefined = get('event.module[0]', ecs);
    return module != null && module.toLowerCase() === 'zeek';
  },
  renderRow: ({ data, isDraggable, scopeId }) => (
    <RowRendererContainer>
      <ZeekDetails data={data} isDraggable={isDraggable} timelineId={scopeId} />
    </RowRendererContainer>
  ),
};
