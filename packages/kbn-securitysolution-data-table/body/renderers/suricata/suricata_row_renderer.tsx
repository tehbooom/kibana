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
import { SuricataDetails } from './suricata_details';

export const suricataRowRenderer: RowRenderer = {
  id: RowRendererId.suricata,
  isInstance: (ecs) => {
    const module: string | null | undefined = get('event.module[0]', ecs);
    return module != null && module.toLowerCase() === 'suricata';
  },
  renderRow: ({ data, isDraggable, scopeId }) => (
    <RowRendererContainer>
      <SuricataDetails data={data} isDraggable={isDraggable} timelineId={scopeId} />
    </RowRendererContainer>
  ),
};
