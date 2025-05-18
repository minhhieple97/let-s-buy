import DataTable from '@/components/ui/data-table';
import { Plus } from 'lucide-react';
import { CategoryDetails, CategoryColumns } from '@/features/category/components';
import { Category } from '@prisma/client';
import { getAllCategories } from '@/features/category/actions';
import { getCategoriesByStoreId } from '@/features/category/db';

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
      newTabLink="/dashboard/admin/categories/new"
      filterValue="name"
      data={categories}
      searchPlaceholder="Search category name..."
      columns={CategoryColumns}
    />
  );
}
