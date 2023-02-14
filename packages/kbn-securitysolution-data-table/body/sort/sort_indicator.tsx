/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiIcon, EuiToolTip } from '@elastic/eui';
import React from 'react';

import * as i18n from '../translations';
import { SortNumber } from './sort_number';

import { Direction } from '../../../../../../common/search_strategy';
import type { SortDirection } from '../../types/timeline';

enum SortDirectionIndicatorEnum {
  SORT_UP = 'sortUp',
  SORT_DOWN = 'sortDown',
}

export type SortDirectionIndicator = undefined | SortDirectionIndicatorEnum;

/** Returns the symbol that corresponds to the specified `SortDirection` */
export const getDirection = (sortDirection: SortDirection): SortDirectionIndicator => {
  switch (sortDirection) {
    case Direction.asc:
      return SortDirectionIndicatorEnum.SORT_UP;
    case Direction.desc:
      return SortDirectionIndicatorEnum.SORT_DOWN;
    case 'none':
      return undefined;
    default:
      throw new Error('Unhandled sort direction');
  }
};

interface Props {
  sortDirection: SortDirection;
  sortNumber: number;
}

/** Renders a sort indicator */
export const SortIndicator = React.memo<Props>(({ sortDirection, sortNumber }) => {
  const direction = getDirection(sortDirection);

  if (direction != null) {
    return (
      <EuiToolTip
        content={
          direction === SortDirectionIndicatorEnum.SORT_UP
            ? i18n.SORTED_ASCENDING
            : i18n.SORTED_DESCENDING
        }
        data-test-subj="sort-indicator-tooltip"
      >
        <>
          <EuiIcon data-test-subj="sortIndicator" type={direction} />
          <SortNumber sortNumber={sortNumber} />
        </>
      </EuiToolTip>
    );
  } else {
    return <EuiIcon data-test-subj="sortIndicator" type={'empty'} />;
  }
});

SortIndicator.displayName = 'SortIndicator';
