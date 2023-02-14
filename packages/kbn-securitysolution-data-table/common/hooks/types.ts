/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { SimpleSavedObject } from '@kbn/core/public';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type IndexPatternSavedObjectAttributes = { title: string };

export type IndexPatternSavedObject = Pick<
  SimpleSavedObject<IndexPatternSavedObjectAttributes>,
  'type' | 'id' | 'attributes' | '_version'
>;
