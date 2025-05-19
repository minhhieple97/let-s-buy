import DataTable from '@/components/ui/data-table';
import { Plus } from 'lucide-react';
import { CategoryDetails, CategoryColumns } from '@/features/categories/components';
import { Category } from '@prisma/client';
import { getAllCategories } from '@/features/categories/actions';
import { getCategoriesByStoreId } from '@/features/categories/db';
import { routes } from '@/config/routes';

export default async function AdminCategoriesPage() {
  const categories: Category[] = await getCategoriesByStoreId();

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Create category
        </>
      }
      modalChildren={<CategoryDetails />}
      newTabLink={routes.admin.newCategory}
      filterValue="name"
      data={categories}
      searchPlaceholder="Search category name..."
      columns={CategoryColumns}
    />
  );
}
