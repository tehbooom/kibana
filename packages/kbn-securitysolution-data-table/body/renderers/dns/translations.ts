/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { i18n } from '@kbn/i18n';

export const ASKED_FOR = i18n.translate(
  'xpack.securitySolution.timeline.body.renderers.dns.askedForDescription',
  {
    defaultMessage: 'asked for',
  }
);

export const RESPONSE_CODE = i18n.translate(
  'xpack.securitySolution.timeline.body.renderers.dns.responseCodeDescription',
  {
    defaultMessage: 'response code:',
  }
);

export const VIA = i18n.translate(
  'xpack.securitySolution.timeline.body.renderers.dns.viaDescription',
  {
    defaultMessage: 'via',
  }
);

export const WHICH_RESOLVED_TO = i18n.translate(
  'xpack.securitySolution.timeline.body.renderers.dns.whichResolvedToDescription',
  {
    defaultMessage: ', which resolved to',
  }
);

export const WITH_QUESTION_TYPE = i18n.translate(
  'xpack.securitySolution.timeline.body.renderers.dns.withQuestionTypeDescription',
  {
    defaultMessage: 'with question type',
  }
);
