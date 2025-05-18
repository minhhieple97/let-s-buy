import { getCategoryById } from '@/features/category/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BadgeCheck, BadgeMinus, Edit } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/config/routes';

type CategoryDetailPageProps = {
  params: {
    categoryId: string;
  };
};

export default async function AdminCategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { categoryId } = await params;
  const category = await getCategoryById(categoryId);

  if (!category) {
    return notFound();
  }

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Category Details</CardTitle>
          <Link href={routes.admin.categoryEdit(category.id)}>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Edit size={15} />
              Edit
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="relative h-64 w-64">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
              <p className="text-lg font-semibold">{category.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">URL</h3>
              <p className="text-lg font-semibold">/{category.url}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Featured</h3>
              <div className="flex items-center gap-2">
                {category.featured ? (
                  <>
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <span>Yes</span>
                  </>
                ) : (
                  <>
                    <BadgeMinus className="h-5 w-5" />
                    <span>No</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
              <p className="text-lg font-semibold">
                {new Date(category.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
