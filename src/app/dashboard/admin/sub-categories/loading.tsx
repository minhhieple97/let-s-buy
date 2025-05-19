import { Skeleton } from '@/components/ui/skeleton';

export default function SubCategoriesLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
