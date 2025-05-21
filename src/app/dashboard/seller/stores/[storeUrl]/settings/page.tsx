import { findStoreByUrl } from '@/features/stores/db';
import { NewStoreForm } from '@/features/stores/components';
import { redirect } from 'next/navigation';

export default async function SellerStoreSettingsPage({
  params,
}: {
  params: Promise<{ storeUrl: string }>;
}) {
  const { storeUrl } = await params;
  const storeDetails = await findStoreByUrl(storeUrl);
  if (!storeDetails) redirect('/dashboard/seller/stores');
  return (
    <div>
      <NewStoreForm data={storeDetails} />
    </div>
  );
}
