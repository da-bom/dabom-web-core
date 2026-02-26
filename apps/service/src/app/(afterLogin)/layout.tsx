import React from 'react';
import { Toaster } from 'react-hot-toast';

import Header from '@service/components/common/Header';
import NavBar from '@service/components/common/NavBar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <div className="z-50 w-full flex-none">
        <Header />
      </div>
      <main className="scrollbar-hide relative w-full flex-1 overflow-y-auto">
        {children}

        <Toaster position="bottom-center" containerClassName="!bottom-32" reverseOrder={false} />
      </main>
      <div className="z-50 w-full flex-none">
        <NavBar />
      </div>
    </div>
  );
}
