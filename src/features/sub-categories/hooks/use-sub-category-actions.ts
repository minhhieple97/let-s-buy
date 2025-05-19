'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { deleteSubCategory } from '../actions';
import { toast } from 'sonner';
import { routes } from '@/config/routes';
import { SubCategoryWithCategoryType } from '../types';

export const useSubCategoryActions = (rowData: SubCategoryWithCategoryType) => {
  const router = useRouter();

  const { execute, isPending } = useAction(deleteSubCategory, {
    onSuccess: () => {
      toast.success('The Sub Category has been deleted.');
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.error.serverError ?? 'Failed to delete subcategory');
    },
  });

  const handleDelete = async () => {
    execute({ subCategoryId: rowData.id });
  };

  const handleViewDetails = () => {
    router.push(routes.admin.subCategoryDetail(rowData.id));
  };

  const handleEdit = () => {
    router.push(routes.admin.subCategoryEdit(rowData.id));
  };

  return {
    isLoading: isPending,
    handleDelete,
    handleViewDetails,
    handleEdit,
  };
};
