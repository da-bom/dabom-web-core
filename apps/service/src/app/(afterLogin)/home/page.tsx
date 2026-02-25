import { Suspense } from 'react';

import UsageDashboard from '@service/components/UsageDashboard';

export default function Page() {
  return (
    <Suspense>
      <UsageDashboard />
    </Suspense>
  );
}
