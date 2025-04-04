/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { ObservabilityTelemetryFtrProviderContext } from '../../../config.telemetry';

export default function ({
  getService,
  getPageObjects,
  loadTestFile,
}: ObservabilityTelemetryFtrProviderContext) {
  const esArchiver = getService('esArchiver');
  const kibanaServer = getService('kibanaServer');
  const PageObjects = getPageObjects(['timePicker', 'svlCommonPage']);
  const from = '2024-06-10T14:00:00.000Z';
  const to = '2024-06-10T16:30:00.000Z';

  describe('discover/observabilitySolution/context_awareness/telemetry', function () {
    before(async () => {
      await esArchiver.load(
        'src/platform/test/functional/fixtures/es_archiver/discover/context_awareness'
      );
      await kibanaServer.importExport.load(
        'src/platform/test/functional/fixtures/kbn_archiver/discover/context_awareness'
      );
      await kibanaServer.uiSettings.update({
        'timepicker:timeDefaults': `{ "from": "${from}", "to": "${to}"}`,
      });
    });

    after(async () => {
      await esArchiver.unload(
        'src/platform/test/functional/fixtures/es_archiver/discover/context_awareness'
      );
      await kibanaServer.importExport.unload(
        'src/platform/test/functional/fixtures/kbn_archiver/discover/context_awareness'
      );
      await PageObjects.timePicker.resetDefaultAbsoluteRangeViaUiSettings();
    });

    loadTestFile(require.resolve('./_telemetry'));
  });
}
