/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Action, Dispatch, MiddlewareAPI } from 'redux';

import { track, METRIC_TYPE, TELEMETRY_EVENT } from '.';
import * as timelineActions from '../../../timelines/store/timeline/actions';

export const telemetryMiddleware = (api: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
  if (timelineActions.endTimelineSaving.match(action)) {
    track(METRIC_TYPE.COUNT, TELEMETRY_EVENT.TIMELINE_SAVED);
  } else if (timelineActions.updateTitleAndDescription.match(action)) {
    track(METRIC_TYPE.COUNT, TELEMETRY_EVENT.TIMELINE_NAMED);
  } else if (timelineActions.showTimeline.match(action)) {
    if (action.payload.show) {
      track(METRIC_TYPE.LOADED, TELEMETRY_EVENT.TIMELINE_OPENED);
    }
  }

  return next(action);
};
