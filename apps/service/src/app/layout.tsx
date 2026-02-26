import '@globalstyles';

import { Providers } from './providers';

export default function RootLayout({
  children,
}: Readonly<{ children: Readonly<React.ReactNode> }>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
