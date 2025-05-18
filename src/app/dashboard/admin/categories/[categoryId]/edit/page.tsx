import { getCategoryById } from '@/features/category/db';
import { CategoryDetails } from '@/features/category/components';
import { notFound } from 'next/navigation';

type CategoryEditPageProps = {
  params: {
    categoryId: string;
  };
};

export default async function AdminEditCategoryPage({ params }: CategoryEditPageProps) {
  const { categoryId } = await params;
  const category = await getCategoryById(categoryId);

  if (!category) {
    return notFound();
  }

  return (
    <div className="w-full">
      <CategoryDetails data={category} />
    </div>
  );
}
