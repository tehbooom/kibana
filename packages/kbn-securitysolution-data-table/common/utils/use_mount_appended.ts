/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WrapperOf<F extends (...args: any) => any> = (...args: Parameters<F>) => ReturnType<F>;
export type MountAppended = WrapperOf<typeof mount>;

export const useMountAppended = () => {
  let root: HTMLElement;

  beforeEach(() => {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.removeChild(root);
  });

  const mountAppended: MountAppended = (node, options) =>
    mount(node, { ...options, attachTo: root });

  return mountAppended;
};
