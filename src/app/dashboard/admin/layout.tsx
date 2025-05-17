import { ReactNode } from 'react';

import Header from '@/components/shared/dashboard/header/header';

import { Sidebar } from '@/components/shared/dashboard/sidebar/sidebar';

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full">
      <Sidebar />
      <div className="ml-[300px]">
        <Header />
        <div className="w-full mt-[75px] p-4">{children}</div>
      </div>
    </div>
  );
}
