import { Suspense } from 'react';

import UsageDashboard from '@service/components/home/UsageDashboard';

export default function Page() {
  return (
    <Suspense>
      <UsageDashboard />
    </Suspense>
  );
}
