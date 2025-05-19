import { FC } from 'react';
import { notFound } from 'next/navigation';

import { SubCategoryDetails } from '@/features/sub-categories/components';
import { getCategoriesByStoreId } from '@/features/categories/db';
import { getSubCategoryById } from '@/features/sub-categories/db';

interface SubCategoryEditPageProps {
  params: {
    'sub-categoryId': string;
  };
}

const SubCategoryEditPage: FC<SubCategoryEditPageProps> = async ({ params }) => {
  const subCategoryId = await params['sub-categoryId'];
  if (!subCategoryId) {
    return notFound();
  }

  const [subCategory, categories] = await Promise.all([
    getSubCategoryById(subCategoryId),
    getCategoriesByStoreId(),
  ]);

  if (!subCategory) {
    return notFound();
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Edit Sub Category</h1>
      </div>
      <SubCategoryDetails data={subCategory} categories={categories} />
    </div>
  );
};

export default SubCategoryEditPage;
