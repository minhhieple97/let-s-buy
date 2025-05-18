import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function CategoryDetailLoading() {
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-9 w-20" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Skeleton className="h-64 w-64 rounded-lg" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-40" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
