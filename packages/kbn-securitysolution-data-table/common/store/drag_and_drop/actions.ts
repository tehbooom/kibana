/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import actionCreatorFactory from 'typescript-fsa';

import type { DataProvider } from '../../../timelines/components/timeline/data_providers/data_provider';

const actionCreator = actionCreatorFactory('x-pack/security_solution/local/drag_and_drop');

export const registerProvider = actionCreator<{ provider: DataProvider }>('REGISTER_PROVIDER');

export const unRegisterProvider = actionCreator<{ id: string }>('UNREGISTER_PROVIDER');

export const noProviderFound = actionCreator<{ id: string }>('NO_PROVIDER_FOUND');
