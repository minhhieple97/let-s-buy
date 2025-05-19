'use client';

import { useRouter } from 'next/navigation';
import { Category } from '@prisma/client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Edit, MoreHorizontal, Trash, Eye } from 'lucide-react';
import { routes } from '@/config/routes';
import { useDeleteCategory } from '../hooks/use-delete-category';

type CellActionsProps = {
  rowData: Category;
};

export const CategoryCellActions: React.FC<CellActionsProps> = ({ rowData }) => {
  const router = useRouter();
  const { deleteCategory, isDeleting } = useDeleteCategory();

  if (!rowData || !rowData.id) return null;

  const handleDelete = () => {
    deleteCategory(rowData.id);
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => router.push(routes.admin.categoryDetail(rowData.id))}
          >
            <Eye size={15} />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => router.push(routes.admin.categoryEdit(rowData.id))}
          >
            <Edit size={15} />
            Edit Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="flex gap-2">
              <Trash size={15} /> Delete category
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undone. This will permanently delete the category and related
            data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive mb-2 text-white"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
