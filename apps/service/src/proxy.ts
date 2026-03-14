import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ACCESS_TOKEN_KEY } from '@shared';

export function proxy(request: NextRequest) {
  const session = request.cookies.get(ACCESS_TOKEN_KEY);

  const { pathname } = request.nextUrl;

  const showDevtools = process.env.NEXT_PUBLIC_SHOW_QUERY_DEVTOOLS === 'true';

  if (showDevtools) {
    return NextResponse.next();
  }

  if (session) {
    if (pathname === '/login' || pathname === '/') {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.next();
  }

  if (!session && pathname !== '/login') {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
