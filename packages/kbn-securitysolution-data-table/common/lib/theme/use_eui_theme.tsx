/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { euiLightVars as lightTheme, euiDarkVars as darkTheme } from '@kbn/ui-theme';

import { DEFAULT_DARK_MODE } from '../../../../common/constants';
import { useUiSetting$ } from '../kibana';

export const useEuiTheme = () => {
  const [darkMode] = useUiSetting$<boolean>(DEFAULT_DARK_MODE);
  return darkMode ? darkTheme : lightTheme;
};
