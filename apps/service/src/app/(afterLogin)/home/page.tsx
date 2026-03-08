import { Suspense } from 'react';

import UsageDashboard from 'src/components/home/UsageDashboard';

export default function Page() {
  return (
    <Suspense>
      <UsageDashboard />
    </Suspense>
  );
}
