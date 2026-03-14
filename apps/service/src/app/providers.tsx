'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function Providers({
  children,
}: Readonly<{
  children: Readonly<React.ReactNode>;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const showDevtools = process.env.NEXT_PUBLIC_SHOW_QUERY_DEVTOOLS === 'true';

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {showDevtools && <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />}
    </QueryClientProvider>
  );
}
