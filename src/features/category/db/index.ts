'server-only';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function findCategoryByNameOrUrl(name: string, url: string) {
  return prisma.category.findFirst({
    where: {
      OR: [{ name }, { url }],
    },
  });
}

export async function findCategoryByNameOrUrlExcludingId(name: string, url: string, id?: string) {
  return prisma.category.findFirst({
    where: {
      AND: [
        {
          OR: [{ name }, { url }],
        },
        {
          NOT: {
            id,
          },
        },
      ],
    },
  });
}

export async function createCategoryInDb(category: Prisma.CategoryCreateInput) {
  return prisma.category.create({
    data: {
      ...category,
    },
  });
}

export async function updateCategoryInDb(data: Prisma.CategoryCreateInput) {
  return prisma.category.update({
    where: {
      id: data.id,
    },
    data,
  });
}

export async function findStoreByUrl(url: string) {
  return prisma.store.findUnique({
    where: { url },
  });
}

export async function getCategoriesByStoreId(storeId?: string) {
  return prisma.category.findMany({
    where: storeId
      ? {
          products: {
            some: {
              storeId,
            },
          },
        }
      : {},
    include: {
      subCategories: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function getSubCategoriesByCategoryId(categoryId: string) {
  return prisma.subCategory.findMany({
    where: {
      categoryId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteCategoryById(id: string) {
  return prisma.category.delete({
    where: {
      id,
    },
  });
}
