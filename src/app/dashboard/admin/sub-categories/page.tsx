import { SubCategoryDetails } from '@/features/sub-categories/components';
import DataTable from '@/components/ui/data-table';

import { getAllSubCategories } from '@/features/sub-categories/db';
import { Plus } from 'lucide-react';
import { SubCategoryColumns } from '@/features/sub-categories/components';
import { getCategoriesByStoreId } from '@/features/categories/db';
import { routes } from '@/config/routes';

export default async function AdminSubCategoriesPage() {
  const [subCategories, categories] = await Promise.all([
    getAllSubCategories(),
    getCategoriesByStoreId(),
  ]);

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Create Sub Category
        </>
      }
      modalChildren={<SubCategoryDetails categories={categories} />}
      newTabLink={routes.admin.newSubCategory}
      filterValue="name"
      data={subCategories}
      searchPlaceholder="Search sub category name..."
      columns={SubCategoryColumns}
    />
  );
}
