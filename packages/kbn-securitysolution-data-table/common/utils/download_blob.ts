/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Method for downloading any file
 *
 * @param blob raw data
 * @param filename of file to be downloaded
 *
 */
export const downloadBlob = (blob: Blob, filename: string) => {
  const objectURL = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectURL;
  anchor.download = filename;
  anchor.click();
  window.URL.revokeObjectURL(objectURL);
  anchor.remove();
};
