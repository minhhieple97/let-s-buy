import { Skeleton } from '@/components/ui/skeleton';

export default function EditSubCategoryLoading() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-[150px]" />
      </div>
    </div>
  );
}
