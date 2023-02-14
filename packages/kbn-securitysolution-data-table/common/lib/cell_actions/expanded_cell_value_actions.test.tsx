/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { shallow } from 'enzyme';
import React from 'react';
import { ExpandedCellValueActions } from './expanded_cell_value_actions';
import type { ColumnHeaderType } from '@kbn/timelines-plugin/common/types';

jest.mock('../kibana');

describe('ExpandedCellValueActions', () => {
  const props = {
    field: {
      id: 'host.name',
      type: 'keyword',
      columnHeaderType: 'not-filtered' as ColumnHeaderType,
      aggregatable: true,
    },
    globalFilters: [],
    onFilterAdded: () => {},
    scopeId: 'mockTimelineId',
    value: ['mock value'],
  };
  const wrapper = shallow(<ExpandedCellValueActions {...props} />);

  test('renders show topN button', () => {
    expect(wrapper.find('[data-test-subj="data-grid-expanded-show-top-n"]').exists()).toBeTruthy();
  });
});
