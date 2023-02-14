/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect, useRef } from 'react';

/**
 * Use this method to watch value for changes.
 *
 * CAUTION: you probably don't need this hook. Try to use useEffect first.
 * It is only useful in rare cases when a value differs by reference but not by content between renders.
 *
 * @param callback A callback to call when the value changes
 * @param nextValue A value to observe for changes
 */
export const useValueChanged = <T>(callback: (value: T) => void, nextValue: T) => {
  const prevValue = useRef(nextValue);

  useEffect(() => {
    if (JSON.stringify(prevValue.current) !== JSON.stringify(nextValue)) {
      prevValue.current = nextValue;
      callback(nextValue);
    }
  }, [callback, nextValue]);
};
