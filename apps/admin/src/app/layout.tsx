'use client';

import { useEffect } from 'react';

import '@globalstyles';

import { Providers } from './providers';

export default function RootLayout({
  children,
}: Readonly<{ children: Readonly<React.ReactNode> }>) {
  useEffect(() => {
    const isSWEnabled = process.env.NEXT_PUBLIC_ENABLE_SW === 'true';

    if ('serviceWorker' in navigator) {
      if (isSWEnabled && process.env.NODE_ENV === 'production') {
        // 켜져 있고 배포 모드일 때만 등록
        navigator.serviceWorker.register('/sw.js');
      } else {
        // 그 외(개발 모드거나 꺼져 있을 때)는 무조건 해제
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
            // console.log('🛠 서비스 워커가 비활성화되어 해제되었습니다.');
          });
        });
      }
    }
  }, []);
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
