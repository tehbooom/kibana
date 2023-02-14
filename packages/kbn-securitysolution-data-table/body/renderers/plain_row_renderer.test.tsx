/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { TimelineId } from '../../../../../../common/types';
import { mount, shallow } from 'enzyme';
import { cloneDeep } from 'lodash';
import React from 'react';

import type { EcsSecurityExtension as Ecs } from '@kbn/securitysolution-ecs';
import { mockTimelineData } from '../../../../../common/mock';
import { plainRowRenderer } from './plain_row_renderer';

describe('plain_row_renderer', () => {
  let mockDatum: Ecs;
  beforeEach(() => {
    mockDatum = cloneDeep(mockTimelineData[0].ecs);
  });

  test('renders correctly against snapshot', () => {
    const children = plainRowRenderer.renderRow({
      data: mockDatum,
      isDraggable: true,
      scopeId: TimelineId.test,
    });
    const wrapper = shallow(<span>{children}</span>);
    expect(wrapper).toMatchSnapshot();
  });

  test('should always return isInstance true', () => {
    expect(plainRowRenderer.isInstance(mockDatum)).toBe(true);
  });

  test('should render a plain row', () => {
    const children = plainRowRenderer.renderRow({
      data: mockDatum,
      isDraggable: true,
      scopeId: TimelineId.test,
    });
    const wrapper = mount(<span>{children}</span>);
    expect(wrapper.text()).toEqual('');
  });
});
