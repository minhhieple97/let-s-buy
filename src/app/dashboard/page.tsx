import { redirect } from 'next/navigation';

// Clerk
import { currentUser } from '@clerk/nextjs/server';
import { Role } from '@prisma/client';

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    return redirect('/');
  }
  if (user.privateMetadata.role === Role.ADMIN) {
    return redirect('/dashboard/admin');
  }

  if (user.privateMetadata.role === Role.SELLER) {
    return redirect('/dashboard/seller');
  }
}
