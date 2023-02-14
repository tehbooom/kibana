/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import actionCreatorFactory from 'typescript-fsa';

import type { Note } from '../../lib/note';

const actionCreator = actionCreatorFactory('x-pack/security_solution/local/app');

export const updateNote = actionCreator<{ note: Note }>('UPDATE_NOTE');

export const addNotes = actionCreator<{ notes: Note[] }>('ADD_NOTE');

export const addError = actionCreator<{ id: string; title: string; message: string[] }>(
  'ADD_ERRORS'
);

export const removeError = actionCreator<{ id: string }>('REMOVE_ERRORS');

export const addErrorHash = actionCreator<{
  id: string;
  hash: string;
  title: string;
  message: string[];
}>('ADD_ERROR_HASH');
