import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req, next) => {
  const isProtectedRoute = createRouteMatcher([
    '/dashboard',
    '/dashboard/(.*)',
    '/checkout',
    '/profile',
    '/profile/(.*)',
  ]);
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
