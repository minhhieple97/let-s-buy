'server-only';

import { prisma } from '@/lib/prisma';
import { Prisma, SubCategory } from '@prisma/client';

export const getAllSubCategories = async () => {
  const subCategories = await prisma.subCategory.findMany({
    include: {
      category: true,
    },
  });
  return subCategories;
};

export const findSubCategoryByNameOrUrl = async (name: string, url: string) => {
  return prisma.subCategory.findFirst({
    where: {
      OR: [{ name }, { url }],
    },
  });
};

export const findSubCategoryByNameOrUrlExcludingId = async (
  name: string,
  url: string,
  id: string,
) => {
  return prisma.subCategory.findFirst({
    where: {
      AND: [{ OR: [{ name }, { url }] }, { NOT: { id } }],
    },
  });
};

export const createSubCategoryInDb = async (subCategory: Prisma.SubCategoryCreateInput) => {
  return prisma.subCategory.create({
    data: subCategory,
  });
};

export const updateSubCategoryInDb = async (subCategory: Prisma.SubCategoryCreateInput) => {
  return prisma.subCategory.update({
    where: { id: subCategory.id },
    data: subCategory,
  });
};

export const getSubCategoryById = async (id: string) => {
  return prisma.subCategory.findUnique({
    where: { id },
  });
};

export const deleteSubCategoryById = async (id: string) => {
  return prisma.subCategory.delete({
    where: { id },
  });
};

export const getSubCategoriesByCategoryId = async (categoryId: string) => {
  return prisma.subCategory.findMany({
    where: { categoryId },
  });
};

export const getRandomSubCategories = async (limit: number = 10) => {
  return prisma.$queryRaw<SubCategory[]>`
    SELECT * FROM SubCategory
    ORDER BY RAND()
    LIMIT ${limit}
  `;
};
