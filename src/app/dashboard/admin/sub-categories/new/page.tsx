import { getCategoriesByStoreId } from '@/features/categories/db';
import { SubCategoryDetails } from '@/features/sub-categories/components';


export default async function AdminNewSubCategoryPage() {
  const categories = await getCategoriesByStoreId();
  return <SubCategoryDetails categories={categories} />;
}
