/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { isObject, isNumber } from 'lodash/fp';

export const parseQueryValue = (
  value: string | number | object | undefined | null
): string | number => {
  if (value == null) {
    return '';
  } else if (isObject(value)) {
    return JSON.stringify(value);
  } else if (isNumber(value)) {
    return value;
  }
  return value.toString();
};
