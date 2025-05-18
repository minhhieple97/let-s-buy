import { Skeleton } from '@/components/ui/skeleton';

export default function CategoriesLoading() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4 gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-12 w-72" />
        </div>
        <div>
          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      <div className="border bg-background rounded-lg">
        <div className="p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-4">
              <Skeleton className="h-40 w-40 rounded-full" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-8 w-8 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
