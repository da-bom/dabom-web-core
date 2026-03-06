import type { Metadata, Viewport } from 'next';

import '@globalstyles';
import { COLORS } from '@shared';

import ServiceWorkerRegistration from '@service/components/ServiceWorkerRegistration';

import { Providers } from './providers';

export const viewport: Viewport = {
  themeColor: COLORS.PRIMARY_300,
};

export const metadata: Metadata = {
  title: '다봄',
  description: '우리 가족 데이터를 한눈에, 다봄',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '다봄',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: Readonly<React.ReactNode> }>) {
  return (
    <html lang="ko">
      <body>
        <ServiceWorkerRegistration />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
