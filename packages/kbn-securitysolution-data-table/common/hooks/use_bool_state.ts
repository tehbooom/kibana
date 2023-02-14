/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useState } from 'react';

type UseBoolStateReturn = [
  state: boolean,
  setTrue: () => void,
  setFalse: () => void,
  toggle: () => void
];

export const useBoolState = (initial = false): UseBoolStateReturn => {
  const [state, setState] = useState(initial);

  const setTrue = useCallback(() => {
    setState(true);
  }, []);

  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  const toggle = useCallback(() => {
    setState((val) => !val);
  }, []);

  return [state, setTrue, setFalse, toggle];
};
