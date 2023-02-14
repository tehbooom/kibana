/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createSelector } from 'reselect';
import { TimelineTabs } from '../../../types/timeline';
import { selectTimeline } from '../../../../../store/timeline/selectors';

export const isEqlOnSelector = () =>
  createSelector(selectTimeline, (timeline) => timeline?.activeTab === TimelineTabs.eql);
