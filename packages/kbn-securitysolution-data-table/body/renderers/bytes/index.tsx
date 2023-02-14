/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { DefaultDraggable } from '../../../../../../common/components/draggables';
import { PreferenceFormattedBytes } from '../../../../../../common/components/formatted_bytes';

export const BYTES_FORMAT = 'bytes';

/**
 * Renders draggable text containing the value of a field representing a
 * duration of time, (e.g. `event.duration`)
 */
export const Bytes = React.memo<{
  contextId: string;
  eventId: string;
  fieldName: string;
  fieldType: string;
  isAggregatable: boolean;
  isDraggable: boolean;
  value?: string | null;
  scopeId?: string;
}>(({ contextId, eventId, fieldName, fieldType, isAggregatable, isDraggable, value, scopeId }) =>
  isDraggable ? (
    <DefaultDraggable
      id={`bytes-default-draggable-${contextId}-${eventId}-${fieldName}-${value}`}
      fieldType={fieldType}
      isAggregatable={isAggregatable}
      isDraggable={isDraggable}
      // @ts-expect-error
      name={name}
      field={fieldName}
      tooltipContent={null}
      value={value}
      scopeId={scopeId}
    >
      <PreferenceFormattedBytes value={`${value}`} />
    </DefaultDraggable>
  ) : (
    <PreferenceFormattedBytes value={`${value}`} />
  )
);

Bytes.displayName = 'Bytes';
