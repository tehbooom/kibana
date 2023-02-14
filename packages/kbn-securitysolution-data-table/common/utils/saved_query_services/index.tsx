/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useState, useEffect } from 'react';
import type { SavedQueryService } from '@kbn/data-plugin/public';
import { createSavedQueryService } from '@kbn/data-plugin/public';

import { useKibana } from '../../lib/kibana';

export const useSavedQueryServices = () => {
  const kibana = useKibana();
  const { http } = kibana.services;

  const [savedQueryService, setSavedQueryService] = useState<SavedQueryService>(
    createSavedQueryService(http)
  );

  useEffect(() => {
    setSavedQueryService(createSavedQueryService(http));
  }, [http]);
  return savedQueryService;
};
