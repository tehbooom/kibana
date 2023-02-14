/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { UseAppToasts } from './use_app_toasts';

const createAppToastsMock = (): jest.Mocked<UseAppToasts> => ({
  addError: jest.fn(),
  addSuccess: jest.fn(),
  addWarning: jest.fn(),
  remove: jest.fn(),
  api: {
    get$: jest.fn(),
    add: jest.fn(),
    remove: jest.fn(),
    addSuccess: jest.fn(),
    addWarning: jest.fn(),
    addDanger: jest.fn(),
    addError: jest.fn(),
    addInfo: jest.fn(),
  },
});

export const useAppToastsMock = {
  create: createAppToastsMock,
};
