/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { getDefaultControlColumn } from '.';

describe('control columns', () => {
  describe('getDefaultControlColumn', () => {
    const ACTION_BUTTON_COUNT = 5;

    test('it returns the expected defaults', () => {
      expect(getDefaultControlColumn(ACTION_BUTTON_COUNT)).toMatchInlineSnapshot(`
        Array [
          Object {
            "headerCellRender": [Function],
            "id": "default-timeline-control-column",
            "rowCellRender": Object {
              "$$typeof": Symbol(react.memo),
              "compare": null,
              "type": [Function],
            },
            "width": 152,
          },
        ]
      `);
    });
  });
});
