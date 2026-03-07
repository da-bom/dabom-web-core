'use client';

import { useState } from 'react';

import '@globalstyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from 'src/components/layout/Header';
import Sidebar from 'src/components/layout/Sidebar';

export default function AfterLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        <div className="flex w-full flex-col gap-4 p-5">
          <Header />
          {children}
        </div>
      </div>
    </QueryClientProvider>
  );
}
