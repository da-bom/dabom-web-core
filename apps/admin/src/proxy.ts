import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const cookieName = process.env.NEXT_PUBLIC_STORAGE_ACCESS_KEY;
  const session = request.cookies.get(cookieName || '');
  const { pathname } = request.nextUrl;

  const showDevtools = process.env.NEXT_PUBLIC_SHOW_QUERY_DEVTOOLS === 'true';

  if (showDevtools) {
    return NextResponse.next();
  }

  if (session && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!session && pathname !== '/') {
    const loginUrl = new URL('/', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
