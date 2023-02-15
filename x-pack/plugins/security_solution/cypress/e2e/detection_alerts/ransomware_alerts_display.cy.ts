/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { setStartDate } from '../../tasks/date_picker';
import { cleanKibana } from '../../tasks/common';
import { waitForAlertsToPopulate } from '../../tasks/create_new_rule';
import { login, visitWithoutDateRange } from '../../tasks/login';

import { ALERTS_URL, TIMELINES_URL } from '../../urls/navigation';
import { esArchiverLoad, esArchiverUnload } from '../../tasks/es_archiver';
import { ALERT_DATA_GRID, TREND_CHART_LEGEND } from '../../screens/alerts';
import { TIMELINE_QUERY } from '../../screens/timeline';

describe('Alerts table', () => {
  before(() => {
    cleanKibana();
    login();
    esArchiverLoad('ransomware_alerts');
  });

  after(() => {
    esArchiverUnload('ransomware_alerts');
  });

  beforeEach(() => {
    visitWithoutDateRange(ALERTS_URL);
    const dateContainingAllEvents = 'Jul 27, 2015 @ 00:00:00.000';
    setStartDate(dateContainingAllEvents);
    waitForAlertsToPopulate();
  });

  it('shows Ransomware Prevention Alert', () => {
    cy.get(ALERT_DATA_GRID)
      .invoke('text')
      .then((text) => {
        expect(text).contains('Ransomware Prevention Alert');
      });
  });

  it('shows Ransomware Detection Alert', () => {
    cy.get(ALERT_DATA_GRID)
      .invoke('text')
      .then((text) => {
        expect(text).contains('Ransomware Detection Alert');
      });
  });

  it('shows Ransomware Detection Alert in the trend chart', () => {
    cy.get(TREND_CHART_LEGEND)
      .invoke('text')
      .then((text) => {
        expect(text).contains('Ransomware Detection Alert');
      });
  });

  it('shows Ransomware Prevention Alert in the trend chart', () => {
    cy.get(TREND_CHART_LEGEND)
      .invoke('text')
      .then((text) => {
        expect(text).contains('Ransomware Prevention Alert');
      });
  });

  describe('Timelines', () => {
    beforeEach(() => {
      visitWithoutDateRange(TIMELINES_URL);
    });

    it('shows Ransomware Prevention Alert when creating the timeline', () => {
      cy.get('[data-test-subj="timeline-new-with-border"]').click({ force: true });

      cy.get(TIMELINE_QUERY).type('event.code:"ransomware"{enter}');

      cy.get('[data-test-subj="statefulCell"]');

      cy.get('[data-test-subj="events"]')
        .invoke('text')
        .then((text) => {
          expect(text).contains('Ransomware Prevention Alert');
        });

      cy.get('[data-test-subj="view-in-analyzer"]').should('be.visible');
    });
  });
});
