/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { ExperimentalFeatures } from '../../../../common/experimental_features';
import type { Note } from '../../lib/note';

export type ErrorState = ErrorModel;

export interface NotesById {
  [id: string]: Note;
}

export interface Error {
  id: string;
  title: string;
  message: string[];
  hash?: string;
  displayError?: boolean;
}

export type ErrorModel = Error[];

export interface AppModel {
  notesById: NotesById;
  errors: ErrorState;
  enableExperimental: ExperimentalFeatures;
}
