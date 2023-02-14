/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { SecuritySolutionDataViewBase } from '../types';

export const mockIndexPattern: SecuritySolutionDataViewBase = {
  fields: [
    {
      name: '@timestamp',
      searchable: true,
      type: 'date',
      aggregatable: true,
    },
    {
      name: '@version',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'agent.ephemeral_id',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'agent.hostname',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'agent.id',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'agent.test1',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'agent.test2',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'agent.test3',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'agent.test4',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'agent.test5',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'agent.test6',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'agent.test7',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'agent.test8',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'host.name',
      searchable: true,
      type: 'string',
      aggregatable: true,
    },
    {
      name: 'nestedField.firstAttributes',
      searchable: true,
      type: 'string',
      aggregatable: false,
    },
    {
      name: 'nestedField.secondAttributes',
      searchable: true,
      type: 'string',
      aggregatable: false,
    },
  ],
  title: 'filebeat-*,auditbeat-*,packetbeat-*',
};

export const mockIndexNames = ['filebeat-*', 'auditbeat-*', 'packetbeat-*'];
