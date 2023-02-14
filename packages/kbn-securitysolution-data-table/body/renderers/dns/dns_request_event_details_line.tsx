/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiFlexGroup } from '@elastic/eui';
import React from 'react';

import { DraggableBadge } from '../../../../../../common/components/draggables';
import { isNillEmptyOrNotFinite, TokensFlexItem } from '../helpers';
import { ProcessDraggableWithNonExistentProcess } from '../process_draggable';
import { UserHostWorkingDir } from '../user_host_working_dir';

import * as i18n from './translations';

interface Props {
  contextId: string;
  dnsQuestionName: string | null | undefined;
  dnsQuestionType: string | null | undefined;
  dnsResolvedIp: string | null | undefined;
  dnsResponseCode: string | null | undefined;
  eventCode: string | null | undefined;
  hostName: string | null | undefined;
  id: string;
  isDraggable?: boolean;
  processExecutable: string | null | undefined;
  processName: string | null | undefined;
  processPid: number | null | undefined;
  userDomain: string | null | undefined;
  userName: string | null | undefined;
  winlogEventId: string | null | undefined;
}

export const DnsRequestEventDetailsLine = React.memo<Props>(
  ({
    contextId,
    dnsQuestionName,
    dnsQuestionType,
    dnsResolvedIp,
    dnsResponseCode,
    eventCode,
    hostName,
    id,
    isDraggable,
    processExecutable,
    processName,
    processPid,
    userDomain,
    userName,
    winlogEventId,
  }) => {
    return (
      <>
        <EuiFlexGroup alignItems="center" justifyContent="center" gutterSize="none" wrap={true}>
          <UserHostWorkingDir
            contextId={contextId}
            eventId={id}
            hostName={hostName}
            isDraggable={isDraggable}
            userDomain={userDomain}
            userName={userName}
            workingDirectory={undefined}
          />

          {!isNillEmptyOrNotFinite(dnsQuestionName) && (
            <>
              <TokensFlexItem component="span" data-test-subj="asked-for" grow={false}>
                {i18n.ASKED_FOR}
              </TokensFlexItem>
              <TokensFlexItem component="span" grow={false}>
                <DraggableBadge
                  contextId={contextId}
                  eventId={id}
                  field="dns.question.name"
                  isDraggable={isDraggable}
                  value={dnsQuestionName}
                  isAggregatable={true}
                  fieldType="keyword"
                />
              </TokensFlexItem>
            </>
          )}

          {!isNillEmptyOrNotFinite(dnsQuestionType) && (
            <>
              <TokensFlexItem component="span" data-test-subj="with-question-type" grow={false}>
                {i18n.WITH_QUESTION_TYPE}
              </TokensFlexItem>
              <TokensFlexItem component="span" grow={false}>
                <DraggableBadge
                  contextId={contextId}
                  eventId={id}
                  field="dns.question.type"
                  isDraggable={isDraggable}
                  value={dnsQuestionType}
                  isAggregatable={true}
                  fieldType="keyword"
                />
              </TokensFlexItem>
            </>
          )}

          {!isNillEmptyOrNotFinite(dnsResolvedIp) && (
            <>
              <TokensFlexItem component="span" data-test-subj="which-resolved-to" grow={false}>
                {i18n.WHICH_RESOLVED_TO}
              </TokensFlexItem>
              <TokensFlexItem component="span" grow={false}>
                <DraggableBadge
                  contextId={contextId}
                  eventId={id}
                  field="dns.resolved_ip"
                  isDraggable={isDraggable}
                  value={dnsResolvedIp}
                  isAggregatable={true}
                  fieldType="ip"
                />
              </TokensFlexItem>
            </>
          )}

          {!isNillEmptyOrNotFinite(dnsResponseCode) && (
            <>
              <TokensFlexItem component="span" grow={false}>
                {'('}
              </TokensFlexItem>
              <TokensFlexItem component="span" data-test-subj="response-code" grow={false}>
                {i18n.RESPONSE_CODE}
              </TokensFlexItem>
              <TokensFlexItem component="span" grow={false}>
                <DraggableBadge
                  contextId={contextId}
                  eventId={id}
                  field="dns.response_code"
                  isDraggable={isDraggable}
                  value={dnsResponseCode}
                  isAggregatable={true}
                  fieldType="keyword"
                />
              </TokensFlexItem>
              <TokensFlexItem component="span" grow={false}>
                {')'}
              </TokensFlexItem>
            </>
          )}

          <TokensFlexItem component="span" grow={false}>
            {i18n.VIA}
          </TokensFlexItem>

          <TokensFlexItem component="span" grow={false}>
            <ProcessDraggableWithNonExistentProcess
              contextId={contextId}
              endgamePid={undefined}
              endgameProcessName={undefined}
              eventId={id}
              isDraggable={isDraggable}
              processPid={processPid}
              processName={processName}
              processExecutable={processExecutable}
            />
          </TokensFlexItem>

          {(!isNillEmptyOrNotFinite(eventCode) || !isNillEmptyOrNotFinite(winlogEventId)) && (
            <>
              {!isNillEmptyOrNotFinite(eventCode) ? (
                <TokensFlexItem component="span" grow={false}>
                  <DraggableBadge
                    contextId={contextId}
                    eventId={id}
                    field="event.code"
                    isDraggable={isDraggable}
                    value={eventCode}
                    isAggregatable={true}
                    fieldType="number"
                  />
                </TokensFlexItem>
              ) : (
                <TokensFlexItem component="span" grow={false}>
                  <DraggableBadge
                    contextId={contextId}
                    eventId={id}
                    iconType="logoWindows"
                    field="winlog.event_id"
                    isDraggable={isDraggable}
                    value={winlogEventId}
                    isAggregatable={true}
                    fieldType="keyword"
                  />
                </TokensFlexItem>
              )}
            </>
          )}
        </EuiFlexGroup>
      </>
    );
  }
);

DnsRequestEventDetailsLine.displayName = 'DnsRequestEventDetailsLine';
