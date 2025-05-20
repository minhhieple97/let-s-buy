'use server';

import { prisma } from '@/lib/prisma';
import { ActionError, adminAction, sellerAction, authAction } from '@/lib/safe-action';
import { Prisma, StoreStatus } from '@prisma/client';
import { z } from 'zod';
import {
  createStoreInDb,
  deleteStoreFromDb,
  findStoreByNameEmailPhoneUrl,
  findStoreByNameEmailPhoneUrlExcludingId,
  findStoreByUrlAndUserId,
  getAllCountriesWithShippingRates,
  getAllStoresFromDb,
  getStoreDefaultShippingDetailsFromDb,
  getStoreOrdersFromDb,
  getStorePageDetailsFromDb,
  updateStoreDefaultShippingDetailsInDb,
  updateStoreInDb,
  updateStoreStatusInDb,
  updateUserRoleToSeller,
  upsertShippingRateInDb,
} from '../db';
import {
  StoreDefaultShippingTypeSchema,
  ShippingRateSchema,
  StoreUrlSchema,
  StoreIdSchema,
  StoreStatusSchema,
  StoreCreateSchema,
  StoreUpdateSchema,
} from '../schemas';
import { StoreCreateInputSchema } from '@/schemas';

export const createStore = sellerAction
  .schema(StoreCreateSchema)
  .action(async ({ parsedInput: store, ctx }) => {
    const existingStore = await findStoreByNameEmailPhoneUrl(
      store.name,
      store.email,
      store.phone,
      store.url,
    );

    if (existingStore) {
      if (existingStore.name === store.name) {
        throw new ActionError('A store with the same name already exists');
      }
      if (existingStore.email === store.email) {
        throw new ActionError('A store with the same email already exists');
      }
      if (existingStore.phone === store.phone) {
        throw new ActionError('A store with the same phone number already exists');
      }
      if (existingStore.url === store.url) {
        throw new ActionError('A store with the same URL already exists');
      }
    }
    const storeData: Prisma.StoreCreateInput = {
      name: store.name,
      description: store.description,
      email: store.email,
      phone: store.phone,
      logo: store.logo,
      cover: store.cover,
      url: store.url,
      featured: store.featured,
      status: store.status as StoreStatus,
      user: {
        connect: { id: ctx.user.id },
      },
    };
    const storeDetails = await createStoreInDb(storeData, ctx.user.id);
    return storeDetails;
  });

export const updateStore = sellerAction
  .schema(StoreUpdateSchema)
  .action(async ({ parsedInput: store, ctx }) => {
    const existingStore = await findStoreByNameEmailPhoneUrlExcludingId(
      store.name,
      store.email,
      store.phone,
      store.url,
      store.id,
    );

    if (existingStore) {
      if (existingStore.name === store.name) {
        throw new ActionError('A store with the same name already exists');
      } else if (existingStore.email === store.email) {
        throw new ActionError('A store with the same email already exists');
      } else if (existingStore.phone === store.phone) {
        throw new ActionError('A store with the same phone number already exists');
      } else if (existingStore.url === store.url) {
        throw new ActionError('A store with the same URL already exists');
      }
    }

    const storeOwnership = await findStoreByUrlAndUserId(store.url, ctx.user.id);
    if (!storeOwnership) {
      throw new ActionError('You do not have permission to update this store');
    }

    const storeDetails = await updateStoreInDb(store);
    return storeDetails;
  });

export const getStoreDefaultShippingDetails = authAction
  .schema(StoreUrlSchema)
  .action(async ({ parsedInput }) => {
    const store = await getStoreDefaultShippingDetailsFromDb(parsedInput.storeUrl);

    if (!store) {
      throw new ActionError('Store not found');
    }

    return store;
  });

export const updateStoreDefaultShippingDetails = sellerAction
  .schema(
    z.object({
      storeUrl: z.string(),
      details: StoreDefaultShippingTypeSchema,
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { storeUrl, details } = parsedInput;

    if (!details) {
      throw new ActionError('No shipping details provided to update');
    }

    const storeOwnership = await findStoreByUrlAndUserId(storeUrl, ctx.user.id);
    if (!storeOwnership) {
      throw new ActionError('You do not have permission to update this store');
    }

    const updatedStore = await updateStoreDefaultShippingDetailsInDb(
      storeUrl,
      ctx.user.id,
      details,
    );
    return updatedStore;
  });

export const getStoreShippingRates = sellerAction
  .schema(StoreUrlSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { storeUrl } = parsedInput;

    const store = await findStoreByUrlAndUserId(storeUrl, ctx.user.id);
    if (!store) {
      throw new ActionError('You do not have permission to access this store');
    }

    const result = await getAllCountriesWithShippingRates(store.id);
    return result;
  });

export const upsertShippingRate = sellerAction
  .schema(
    z.object({
      storeUrl: z.string(),
      shippingRate: ShippingRateSchema,
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { storeUrl, shippingRate } = parsedInput;

    if (!shippingRate.countryId) {
      throw new ActionError('Please provide a valid country ID');
    }

    const store = await findStoreByUrlAndUserId(storeUrl, ctx.user.id);
    if (!store) {
      throw new ActionError('You do not have permission to update this store');
    }

    const shippingRateDetails = await upsertShippingRateInDb(shippingRate, store.id);
    return shippingRateDetails;
  });

export const getStoreOrders = sellerAction
  .schema(StoreUrlSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { storeUrl } = parsedInput;

    const store = await findStoreByUrlAndUserId(storeUrl, ctx.user.id);
    if (!store) {
      throw new ActionError('You do not have permission to access this store');
    }

    const orders = await getStoreOrdersFromDb(store.id);
    return orders;
  });

export const applySeller = authAction
  .schema(StoreCreateInputSchema)
  .action(async ({ parsedInput: store, ctx }) => {
    const existingStore = await findStoreByNameEmailPhoneUrl(
      store.name,
      store.email,
      store.phone,
      store.url,
    );

    if (existingStore) {
      if (existingStore.name === store.name) {
        throw new ActionError('A store with the same name already exists');
      } else if (existingStore.email === store.email) {
        throw new ActionError('A store with the same email already exists');
      } else if (existingStore.phone === store.phone) {
        throw new ActionError('A store with the same phone number already exists');
      } else if (existingStore.url === store.url) {
        throw new ActionError('A store with the same URL already exists');
      }
    }

    const storeDetails = await createStoreInDb(store, ctx.user.id);
    return storeDetails;
  });

export const getAllStores = adminAction.action(async () => {
  const stores = await getAllStoresFromDb();
  return stores;
});

export const updateStoreStatus = adminAction
  .schema(StoreStatusSchema)
  .action(async ({ parsedInput }) => {
    const { storeId, status } = parsedInput;

    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      throw new ActionError('Store not found!');
    }

    const updatedStore = await updateStoreStatusInDb(storeId, status);

    if (store.status === StoreStatus.PENDING && updatedStore.status === StoreStatus.ACTIVE) {
      await updateUserRoleToSeller(store.userId);
    }

    return updatedStore;
  });

export const deleteStore = adminAction.schema(StoreIdSchema).action(async ({ parsedInput }) => {
  const { storeId } = parsedInput;

  const response = await deleteStoreFromDb(storeId);
  return response;
});

export const getStorePageDetails = authAction
  .schema(StoreUrlSchema)
  .action(async ({ parsedInput }) => {
    const { storeUrl } = parsedInput;

    const store = await getStorePageDetailsFromDb(storeUrl);

    if (!store) {
      throw new ActionError(`Store with URL "${storeUrl}" not found.`);
    }

    return store;
  });
