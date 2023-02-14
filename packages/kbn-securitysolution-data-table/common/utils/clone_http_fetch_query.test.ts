/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { cloneHttpFetchQuery } from './clone_http_fetch_query';
import type { HttpFetchQuery } from '@kbn/core/public';
import type { Immutable } from '../../../common/endpoint/types';

describe('cloneHttpFetchQuery', () => {
  it('can clone complex queries', () => {
    const query: Immutable<HttpFetchQuery> = {
      a: 'a',
      '1': 1,
      undefined,
      array: [1, 2],
    };
    expect(cloneHttpFetchQuery(query)).toMatchInlineSnapshot(`
      Object {
        "1": 1,
        "a": "a",
        "array": Array [
          1,
          2,
        ],
        "undefined": undefined,
      }
    `);
  });
});
