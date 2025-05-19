import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { RoleType } from '@constants/data';
const isAdminRoute = createRouteMatcher(['/dashboard/admin', '/dashboard/admin/(.*)']);

const isSellerRoute = createRouteMatcher(['/dashboard/seller', '/dashboard/seller/(.*)']);

const isProtectedRoute = createRouteMatcher([
  '/dashboard',
  '/dashboard/(.*)',
  '/checkout',
  '/profile',
  '/profile/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
  if (userId) {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const role = user.privateMetadata?.role;
    if (isAdminRoute(req) && role !== RoleType.ADMIN) {
      return Response.redirect(new URL('/', req.url));
    }

    if (isSellerRoute(req) && role !== RoleType.SELLER) {
      return Response.redirect(new URL('/', req.url));
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
