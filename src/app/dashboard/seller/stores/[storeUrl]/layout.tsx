import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

import { findStoreByConditional } from '@/features/stores/db';
import { Header, Sidebar } from '@/components/shared/dashboard';

export default async function SellerStoreDashboardLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  if (!user) {
    redirect('/');
  }

  const stores = await findStoreByConditional({
    userId: user.id,
  });

  return (
    <div className="h-full w-full flex">
      <Sidebar stores={stores} />
      <div className="w-full ml-[300px]">
        <Header />
        <div className="w-full mt-[75px] p-4">{children}</div>
      </div>
    </div>
  );
}
