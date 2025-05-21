import { Skeleton } from '@/components/ui/skeleton';

export default function SellerStoreSettingsLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/2 mb-6" />
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-12 w-32 mt-4" />
      </div>
    </div>
  );
}
