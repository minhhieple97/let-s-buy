import { FC } from 'react';

import { currentUser } from '@clerk/nextjs/server';

import Logo from '@shared/logo';
import UserInfo from './user-info';
import SidebarNavAdmin from './nav-admin';
import SidebarNavSeller from './nav-seller';

import { SellerDashboardSidebarOptions, adminDashboardSidebarOptions } from '@/constants/data';

import { Store } from '@prisma/client';
import StoreSwitcher from '@/components/shared/dashboard/sidebar/store-switcher';
import { isAdmin, isSeller } from '@/lib/utils';

type SidebarProps = {
  stores?: Store[];
};

export const Sidebar: FC<SidebarProps> = async ({ stores }) => {
  const user = await currentUser();
  const userIsAdmin = isAdmin(user!);
  const userIsSeller = isSeller(user!);
  return (
    <div className="w-[300px] border-r h-screen p-4 flex flex-col fixed top-0 left-0 bottom-0">
      {user && <UserInfo user={user} />}
      {!userIsAdmin && stores && <StoreSwitcher stores={stores} />}
      {userIsAdmin && <SidebarNavAdmin menuLinks={adminDashboardSidebarOptions} />}
      {userIsSeller && <SidebarNavSeller menuLinks={SellerDashboardSidebarOptions} />}
    </div>
  );
};
