import { Skeleton } from '@/components/ui/skeleton';

export default function SellerStoreLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
