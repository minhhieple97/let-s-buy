import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';
import { findStoreByConditional } from '@/features/stores/db';
import { routes } from '@/config/routes';

export default async function SellerDashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect('/');
  }

  const stores = await findStoreByConditional({
    userId: user.id,
  });
  if (stores.length === 0) {
    redirect(routes.seller.newStore);
  }

  redirect(routes.seller.store(stores[0].url));

  return <div>Seller Dashboard</div>;
}
