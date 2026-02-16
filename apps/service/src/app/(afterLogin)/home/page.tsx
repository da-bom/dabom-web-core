import { Suspense } from "react";

import UsageDashboard from "@service/components/UsageDashboard";

const UsageDashboardPage = () => {
  return (
    <Suspense>
      <UsageDashboard />
    </Suspense>
  );
};

export default UsageDashboardPage;
