import { prisma } from '@/lib/prisma';
import { Prisma, ShippingRate, Store, StoreStatus } from '@prisma/client';
import { IStoreDefaultShippingType, IStoreUpdate } from '../types';

export const findStoreByNameEmailPhoneUrl = async (
  name: string,
  email: string,
  phone: string,
  url: string,
) => {
  return prisma.store.findFirst({
    where: {
      OR: [{ name }, { email }, { phone }, { url }],
    },
  });
};

export const findStoreByNameEmailPhoneUrlExcludingId = async (
  name: string,
  email: string,
  phone: string,
  url: string,
  id: string,
) => {
  return prisma.store.findFirst({
    where: {
      AND: [
        {
          OR: [{ name }, { email }, { phone }, { url }],
        },
        {
          NOT: {
            id,
          },
        },
      ],
    },
  });
};

export const createStoreInDb = async (store: Prisma.StoreCreateInput, userId: string) => {
  return prisma.store.create({
    data: {
      ...store,
      defaultShippingService: store.defaultShippingService || 'International Delivery',
      returnPolicy: store.returnPolicy || 'Return in 30 days.',
      user: {
        connect: { id: userId },
      },
    },
  });
};

export const updateStoreInDb = async (storeData: IStoreUpdate) => {
  return prisma.store.update({
    where: { id: storeData.id },
    data: {
      name: storeData.name,
      description: storeData.description,
      email: storeData.email,
      phone: storeData.phone,
      logo: storeData.logo,
      cover: storeData.cover,
      url: storeData.url,
      featured: storeData.featured || false,
      status: storeData.status as StoreStatus,
    },
  });
};

export const findStoreByUrl = async (url: string) => {
  return prisma.store.findUnique({
    where: {
      url,
    },
  });
};

export const findStoreByUrlAndUserId = (url: string, userId: string) => {
  return prisma.store.findUnique({
    where: {
      url,
      userId,
    },
  });
};

export const updateStoreDefaultShippingDetailsInDb = async (
  storeUrl: string,
  userId: string,
  details: IStoreDefaultShippingType,
) => {
  return prisma.store.update({
    where: {
      url: storeUrl,
      userId,
    },
    data: details,
  });
};

export const getStoreDefaultShippingDetailsFromDb = async (storeUrl: string) => {
  return prisma.store.findUnique({
    where: {
      url: storeUrl,
    },
    select: {
      defaultShippingService: true,
      defaultShippingFeePerItem: true,
      defaultShippingFeeForAdditionalItem: true,
      defaultShippingFeePerKg: true,
      defaultShippingFeeFixed: true,
      defaultDeliveryTimeMin: true,
      defaultDeliveryTimeMax: true,
      returnPolicy: true,
    },
  });
};

export const getAllCountriesWithShippingRates = async (storeId: string) => {
  const countries = await prisma.country.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const shippingRates = await prisma.shippingRate.findMany({
    where: {
      storeId,
    },
  });

  const rateMap = new Map();
  shippingRates.forEach((rate) => {
    rateMap.set(rate.countryId, rate);
  });

  return countries.map((country) => ({
    countryId: country.id,
    countryName: country.name,
    shippingRate: rateMap.get(country.id) || null,
  }));
};

export const upsertShippingRateInDb = async (shippingRate: ShippingRate, storeId: string) => {
  return prisma.shippingRate.upsert({
    where: {
      id: shippingRate.id,
    },
    update: { ...shippingRate, storeId },
    create: { ...shippingRate, storeId },
  });
};

export const getStoreOrdersFromDb = async (storeId: string) => {
  return prisma.orderGroup.findMany({
    where: {
      storeId,
    },
    include: {
      items: true,
      coupon: true,
      order: {
        select: {
          paymentStatus: true,
          shippingAddress: {
            include: {
              country: true,
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
          paymentDetails: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
};

export const getAllStoresFromDb = async () => {
  return prisma.store.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const updateStoreStatusInDb = async (storeId: string, status: StoreStatus) => {
  return prisma.store.update({
    where: {
      id: storeId,
    },
    data: {
      status,
    },
  });
};

export const updateUserRoleToSeller = async (userId: string) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: 'SELLER',
    },
  });
};

export const deleteStoreFromDb = async (storeId: string) => {
  return prisma.store.delete({
    where: {
      id: storeId,
    },
  });
};

export const getStorePageDetailsFromDb = async (storeUrl: string) => {
  return prisma.store.findUnique({
    where: {
      url: storeUrl,
      status: StoreStatus.ACTIVE,
    },
    select: {
      id: true,
      name: true,
      description: true,
      logo: true,
      cover: true,
      averageRating: true,
      numReviews: true,
    },
  });
};

export const findStoreByConditional = (con: Prisma.StoreWhereInput) => {
  return prisma.store.findMany({
    where: con,
  });
};
