import { Providers } from '../providers';

export default function RootLayout({
  children,
}: Readonly<{ children: Readonly<React.ReactNode> }>) {
  return <Providers>{children}</Providers>;
}
