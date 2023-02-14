/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

interface HookWrapperProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hook: (args?: any) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hookProps?: any;
}

export const HookWrapper = ({ hook, hookProps }: HookWrapperProps) => {
  const myHook = hook ? (hookProps ? hook(hookProps) : hook()) : null;
  return <div>{JSON.stringify(myHook)}</div>;
};
