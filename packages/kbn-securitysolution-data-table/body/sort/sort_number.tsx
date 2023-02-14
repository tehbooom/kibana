/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiIcon, EuiNotificationBadge } from '@elastic/eui';
import React from 'react';

interface Props {
  sortNumber: number;
}

export const SortNumber = React.memo<Props>(({ sortNumber }) => {
  if (sortNumber >= 0) {
    return (
      <EuiNotificationBadge color="subdued" data-test-subj="sortNumber">
        {sortNumber + 1}
      </EuiNotificationBadge>
    );
  } else {
    return <EuiIcon data-test-subj="sortEmptyNumber" type={'empty'} />;
  }
});

SortNumber.displayName = 'SortNumber';
