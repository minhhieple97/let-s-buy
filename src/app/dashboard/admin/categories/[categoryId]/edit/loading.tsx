import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function CategoryEditLoading() {
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Image upload skeleton */}
            <div className="flex justify-center">
              <Skeleton className="h-40 w-40 rounded-full" />
            </div>

            {/* Form fields skeletons */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Featured checkbox skeleton */}
            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Skeleton className="h-5 w-5" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>

            {/* Button skeleton */}
            <Skeleton className="h-10 w-40" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
