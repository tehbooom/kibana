/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { resolvePathVariables } from './resolve_path_variables';

describe('utils', () => {
  describe('resolvePathVariables', () => {
    it('should resolve defined variables', () => {
      expect(resolvePathVariables('/segment1/{var1}/segment2', { var1: 'value1' })).toBe(
        '/segment1/value1/segment2'
      );
    });

    it('should not resolve undefined variables', () => {
      expect(resolvePathVariables('/segment1/{var1}/segment2', {})).toBe(
        '/segment1/{var1}/segment2'
      );
    });

    it('should ignore unused variables', () => {
      expect(resolvePathVariables('/segment1/{var1}/segment2', { var2: 'value2' })).toBe(
        '/segment1/{var1}/segment2'
      );
    });

    it('should replace multiple variable occurences', () => {
      expect(resolvePathVariables('/{var1}/segment1/{var1}', { var1: 'value1' })).toBe(
        '/value1/segment1/value1'
      );
    });

    it('should replace multiple variables', () => {
      const path = resolvePathVariables('/{var1}/segment1/{var2}', {
        var1: 'value1',
        var2: 'value2',
      });

      expect(path).toBe('/value1/segment1/value2');
    });
  });
});
