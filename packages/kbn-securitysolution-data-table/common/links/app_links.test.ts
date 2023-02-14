/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { links } from './app_links';
import type { LinkItem, AppLinkItems } from './types';

const traverse = (linksItems: AppLinkItems, fn: (link: LinkItem) => void) => {
  linksItems.forEach((link) => {
    fn(link);
    if (link.links) {
      traverse(link.links, fn);
    }
  });
};

describe('Security app links', () => {
  it('should only contain static paths', () => {
    traverse(links, (link) => {
      expect(link.path).not.toContain('/:');
    });
  });
});
