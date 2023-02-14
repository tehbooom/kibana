/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiSpacer } from '@elastic/eui';
import React from 'react';
import styled from 'styled-components';

import type { EcsSecurityExtension as Ecs } from '@kbn/securitysolution-ecs';

import { NetflowRenderer } from '../netflow';
import { ZeekSignature } from './zeek_signature';

const Details = styled.div`
  margin: 5px 0;
`;

Details.displayName = 'Details';

interface ZeekDetailsProps {
  data: Ecs;
  isDraggable?: boolean;
  timelineId: string;
}

export const ZeekDetails = React.memo<ZeekDetailsProps>(({ data, isDraggable, timelineId }) =>
  data.zeek != null ? (
    <Details>
      <ZeekSignature data={data} isDraggable={isDraggable} timelineId={timelineId} />
      <EuiSpacer size="s" />
      <NetflowRenderer data={data} isDraggable={isDraggable} timelineId={timelineId} />
    </Details>
  ) : null
);

ZeekDetails.displayName = 'ZeekDetails';
