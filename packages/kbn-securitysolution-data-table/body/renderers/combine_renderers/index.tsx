/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import type { EcsSecurityExtension as Ecs } from '@kbn/securitysolution-ecs';
import type { RowRenderer, RowRendererId } from '../../../types';

export const combineRenderers = ({
  a,
  b,
  id,
}: {
  a: RowRenderer;
  b: RowRenderer;
  id: RowRendererId;
}): RowRenderer => ({
  id,
  isInstance: (data: Ecs) => a.isInstance(data) || b.isInstance(data),
  renderRow: ({
    contextId,
    data,
    isDraggable,
    scopeId,
  }: {
    contextId?: string;
    data: Ecs;
    isDraggable: boolean;
    scopeId: string;
  }) => (
    <>
      {a.isInstance(data) && a.renderRow({ contextId, data, isDraggable, scopeId })}
      {b.isInstance(data) && b.renderRow({ contextId, data, isDraggable, scopeId })}
    </>
  ),
});
