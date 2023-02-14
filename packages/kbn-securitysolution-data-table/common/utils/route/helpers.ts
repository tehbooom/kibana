/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { noop } from 'lodash/fp';
import type { Dispatch } from 'react';
import { createContext } from 'react';
import { SecurityPageName } from '../../../app/types';

import type { RouteSpyState, RouteSpyAction } from './types';

export const initRouteSpy: RouteSpyState = {
  pageName: SecurityPageName.noPage,
  detailName: undefined,
  tabName: undefined,
  search: '',
  pathName: '/',
  state: undefined,
};

export const RouterSpyStateContext = createContext<[RouteSpyState, Dispatch<RouteSpyAction>]>([
  initRouteSpy,
  () => noop,
]);
