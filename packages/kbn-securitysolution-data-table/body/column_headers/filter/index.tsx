/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { noop } from 'lodash/fp';
import React from 'react';

import type { ColumnHeaderOptions } from '../../../types';
import { DEFAULT_COLUMN_MIN_WIDTH } from '../../constants';
import type { OnFilterChange } from '../../../events';
import { TextFilter } from '../text_filter';

interface Props {
  header: ColumnHeaderOptions;
  onFilterChange?: OnFilterChange;
}

/** Renders a header's filter, based on the `columnHeaderType` */
export const Filter = React.memo<Props>(({ header, onFilterChange = noop }) => {
  switch (header.columnHeaderType) {
    case 'text-filter':
      return (
        <TextFilter
          columnId={header.id}
          minWidth={header.initialWidth ?? DEFAULT_COLUMN_MIN_WIDTH}
          onFilterChange={onFilterChange}
          placeholder={header.placeholder}
        />
      );
    case 'not-filtered': // fall through
    default:
      return null;
  }
});

Filter.displayName = 'Filter';
