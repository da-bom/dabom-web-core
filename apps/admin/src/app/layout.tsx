import '@globalstyles';

export default function RootLayout({
  children,
}: Readonly<{ children: Readonly<React.ReactNode> }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
