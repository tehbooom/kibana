/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useState } from 'react';
import { createHtmlPortalNode } from 'react-reverse-portal';

/**
 * A singleton portal for rendering content in the global header
 */
const globalKQLHeaderPortalNodeSingleton = createHtmlPortalNode();

export const useGlobalHeaderPortal = () => {
  const [globalKQLHeaderPortalNode] = useState(globalKQLHeaderPortalNodeSingleton);

  return { globalKQLHeaderPortalNode };
};
