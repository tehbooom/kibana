/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiFlexGroup } from '@elastic/eui';
import React from 'react';
import styled from 'styled-components';

import { DraggableBadge } from '../../../../../common/components/draggables';

import { isNillEmptyOrNotFinite, TokensFlexItem } from './helpers';

const HashFlexGroup = styled(EuiFlexGroup)`
  margin: ${({ theme }) => theme.eui.euiSizeXS};
`;

interface Props {
  contextId: string;
  eventId: string;
  isDraggable?: boolean;
  processHashSha256: string | null | undefined;
}

export const ProcessHash = React.memo<Props>(
  ({ contextId, eventId, isDraggable, processHashSha256 }) => {
    if (isNillEmptyOrNotFinite(processHashSha256)) {
      return null;
    }

    return (
      <HashFlexGroup alignItems="center" direction="column" gutterSize="none">
        <TokensFlexItem grow={false} component="div">
          <DraggableBadge
            contextId={contextId}
            eventId={eventId}
            field="process.hash.sha256"
            iconType="number"
            isDraggable={isDraggable}
            value={processHashSha256}
            fieldType="keyword"
            isAggregatable={true}
          />
        </TokensFlexItem>
      </HashFlexGroup>
    );
  }
);

ProcessHash.displayName = 'ProcessHash';
