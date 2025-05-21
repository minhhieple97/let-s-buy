import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Store, StoreStatus } from '@prisma/client';
import { StoreCreateSchema } from '../schemas';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { createStore, updateStore } from '../actions';
import { toast } from 'sonner';
import { routes } from '@/config/routes';

export const useStoreForm = (oldStore?: Store) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof StoreCreateSchema>>({
    mode: 'onChange',
    resolver: zodResolver(StoreCreateSchema),
    defaultValues: {
      name: oldStore?.name,
      description: oldStore?.description,
      email: oldStore?.email,
      phone: oldStore?.phone,
      logo: oldStore?.logo,
      cover: oldStore?.cover,
      url: oldStore?.url,
      featured: oldStore?.featured || false,
      status: oldStore?.status || StoreStatus.PENDING,
    },
  });

  const { execute: executeCreate, isPending: isCreating } = useAction(createStore, {
    onSuccess: (result) => {
      router.push(routes.seller.store(result?.data?.url || ''));
      router.refresh();
      toast.success(`Congratulations! '${result?.data?.name}' is now created.`);
    },
    onError: (error) => {
      toast.error(error.error.serverError ?? 'Something went wrong');
    },
  });

  const { execute: executeUpdate, isPending: isUpdating } = useAction(updateStore, {
    onSuccess: () => {
      router.refresh();
      toast.success('Store has been updated.');
    },
    onError: (error) => {
      toast.error(error.error.serverError ?? 'Something went wrong');
    },
  });

  useEffect(() => {
    if (oldStore) {
      form.reset({
        name: oldStore.name,
        description: oldStore.description,
        email: oldStore.email,
        phone: oldStore.phone,
        logo: oldStore.logo,
        cover: oldStore.cover,
        url: oldStore.url,
        featured: oldStore.featured,
        status: oldStore.status.toString(),
      });
    }
  }, [oldStore, form]);

  const handleSubmit = async (values: z.infer<typeof StoreCreateSchema>) => {
    const payload = {
      name: values.name,
      description: values.description,
      email: values.email,
      phone: values.phone,
      logo: values.logo,
      cover: values.cover,
      url: values.url,
      featured: values.featured || false,
      status: values.status,
    };

    if (oldStore) {
      const updatePayload = {
        ...payload,
        id: oldStore.id,
      };
      executeUpdate(updatePayload);
      return;
    }
    executeCreate(payload);
  };

  return {
    form,
    isLoading: isCreating || isUpdating,
    handleSubmit,
    isEditing: Boolean(oldStore?.id),
  };
};
