import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Category } from '@prisma/client';
import { CategoryFormSchema } from '../schemas';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { createCategory, updateCategory } from '../actions';
import { toast } from 'sonner';
import { routes } from '@/config/routes';

export const useCategoryForm = (oldCategory?: Category) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: oldCategory?.name,
      image: oldCategory?.image ? [{ url: oldCategory?.image }] : [],
      url: oldCategory?.url,
      featured: oldCategory?.featured ?? false,
    },
  });

  const { execute, isPending } = useAction(oldCategory ? updateCategory : createCategory, {
    onSuccess: (result) => {
      router.push(routes.admin.categories);
      router.refresh();
      toast.success(
        oldCategory
          ? 'Category has been updated.'
          : `Category ${result?.data?.name} is created successfully.`,
      );
    },
    onError: (error) => {
      toast.error(error.error.serverError ?? 'Something went wrong');
    },
  });

  useEffect(() => {
    if (oldCategory) {
      form.reset({
        name: oldCategory?.name,
        image: oldCategory?.image ? [{ url: oldCategory?.image }] : [],
        url: oldCategory?.url,
        featured: oldCategory?.featured ?? false,
      });
    }
  }, [oldCategory, form]);

  const handleSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {
    const imageUrl = values.image[0].url;
    const isEditing = Boolean(oldCategory);
    const payload = {
      name: values.name,
      image: imageUrl,
      url: values.url,
      featured: values.featured || false,
    };
    if (isEditing) {
      execute({ ...payload, id: oldCategory?.id });
    } else {
      execute(payload);
    }
  };

  return {
    form,
    isLoading: isPending,
    handleSubmit,
    isEditing: Boolean(oldCategory?.id),
  };
};
