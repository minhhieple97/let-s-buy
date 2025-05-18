import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAction } from 'next-safe-action/hooks';
import { deleteCategory } from '../actions';

export const useDeleteCategory = () => {
  const router = useRouter();

  const { execute, isPending } = useAction(deleteCategory, {
    onSuccess: () => {
      toast.success('Category deleted successfully');
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to delete category');
    },
  });

  const handleDeleteCategory = (categoryId: string) => {
    execute({ categoryId });
  };

  return {
    deleteCategory: handleDeleteCategory,
    isDeleting: isPending,
  };
};
