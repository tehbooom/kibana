/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { createHtmlPortalNode, OutPortal } from 'react-reverse-portal';

/**
 * A singleton portal for rendering content in the global header
 */
const timelineEventsCountPortalNodeSingleton = createHtmlPortalNode();
const eqlEventsCountPortalNodeSingleton = createHtmlPortalNode();

export const useTimelineEventsCountPortal = () => {
  const [timelineEventsCountPortalNode] = useState(timelineEventsCountPortalNodeSingleton);
  return { portalNode: timelineEventsCountPortalNode };
};

export const TimelineEventsCountBadge = React.memo(() => {
  const { portalNode } = useTimelineEventsCountPortal();
  return <OutPortal node={portalNode} />;
});

TimelineEventsCountBadge.displayName = 'TimelineEventsCountBadge';

export const useEqlEventsCountPortal = () => {
  const [eqlEventsCountPortalNode] = useState(eqlEventsCountPortalNodeSingleton);
  return { portalNode: eqlEventsCountPortalNode };
};

export const EqlEventsCountBadge = React.memo(() => {
  const { portalNode } = useEqlEventsCountPortal();
  return <OutPortal node={portalNode} />;
});

EqlEventsCountBadge.displayName = 'EqlEventsCountBadge';
