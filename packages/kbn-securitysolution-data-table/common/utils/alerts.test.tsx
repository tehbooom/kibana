/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { buildAlertsQuery } from './alerts';

describe('Alerts helpers', () => {
  describe('buildAlertsQuery', () => {
    it('it builds the alerts query', () => {
      expect(buildAlertsQuery(['alert-id-1', 'alert-id-2'])).toEqual({
        query: {
          bool: {
            filter: {
              ids: {
                values: ['alert-id-1', 'alert-id-2'],
              },
            },
          },
        },
        size: 10000,
      });
    });
  });
});
