import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function BeforeLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
