import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import authConfig from './app/auth.config';

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  if (
    !req.auth &&
    req.nextUrl.pathname !== '/login' &&
    req.nextUrl.pathname !== '/'
  ) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }

  if (req.auth && req.nextUrl.pathname === '/login') {
    return Response.redirect(new URL('/dashboard', req.nextUrl.origin));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
