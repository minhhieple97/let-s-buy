import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Category, SubCategory } from '@prisma/client';
import { SubCategoryFormSchema } from '../schemas';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { createSubCategory, updateSubCategory } from '../actions';
import { toast } from 'sonner';
import { routes } from '@/config/routes';

export const useSubCategoryForm = (oldSubCategory?: SubCategory) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SubCategoryFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(SubCategoryFormSchema),
    defaultValues: {
      name: oldSubCategory?.name || '',
      image: oldSubCategory?.image ? [{ url: oldSubCategory?.image }] : [],
      url: oldSubCategory?.url || '',
      featured: oldSubCategory?.featured ?? false,
      categoryId: oldSubCategory?.categoryId || '',
    },
  });

  const { execute, isPending } = useAction(
    oldSubCategory?.id ? updateSubCategory : createSubCategory,
    {
      onSuccess: (result) => {
        router.push(routes.admin.subCategories);
        router.refresh();
        toast.success(
          oldSubCategory
            ? 'SubCategory has been updated.'
            : `SubCategory ${result?.data?.name} is created successfully.`,
        );
      },
      onError: (error) => {
        console.log({ error });
        toast.error(error.error.serverError ?? 'Something went wrong');
      },
    },
  );

  useEffect(() => {
    if (oldSubCategory) {
      form.reset({
        name: oldSubCategory?.name,
        image: oldSubCategory?.image ? [{ url: oldSubCategory?.image }] : [],
        url: oldSubCategory?.url,
        featured: oldSubCategory?.featured ?? false,
        categoryId: oldSubCategory.categoryId,
      });
    }
  }, [oldSubCategory, form]);

  const handleSubmit = async (values: z.infer<typeof SubCategoryFormSchema>) => {
    const imageUrl = values.image[0]?.url;
    const isEditing = Boolean(oldSubCategory?.id);
    const payload = {
      name: values.name,
      image: imageUrl,
      url: values.url,
      featured: values.featured || false,
      category: { connect: { id: values.categoryId } },
    };

    if (isEditing) {
      execute({ ...payload, id: oldSubCategory?.id });
    } else {
      execute(payload);
    }
  };

  return {
    form,
    isLoading: isPending,
    handleSubmit,
    isEditing: Boolean(oldSubCategory?.id),
  };
};
