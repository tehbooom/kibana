/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type HistoryActionType = 'timeline-added-provider' | 'timeline-removed-provider';

/** A historic record of user actions */
export interface History {
  /** The point in time this history entry is applicable to */
  date: Date;
  /** Unstructured text containing the details of the history entry */
  details: string;
  /** Uniquely identifies the history entry */
  id: string;
  /** A short summary of the action */
  summary: string;
  /** The type of action performed */
  type: HistoryActionType;
  /** Who performed the action */
  user: string;
}
