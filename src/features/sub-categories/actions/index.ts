'use server';

import { ActionError, adminAction } from '@/lib/safe-action';
import { z } from 'zod';
import { SubCategoryCreateInputSchema } from '@/schemas';
import { SubCategoryIdSchema } from '../schemas';
import {
  findSubCategoryByNameOrUrl,
  findSubCategoryByNameOrUrlExcludingId,
  createSubCategoryInDb,
  updateSubCategoryInDb,
  getAllSubCategories,
  getSubCategoryById,
  deleteSubCategoryById,
  getRandomSubCategories,
  getSubCategoriesByCategoryId,
} from '../db';

export const createSubCategory = adminAction
  .schema(SubCategoryCreateInputSchema)
  .action(async ({ parsedInput: subCategory }) => {
    const existingSubCategory = await findSubCategoryByNameOrUrl(subCategory.name, subCategory.url);

    if (existingSubCategory) {
      if (existingSubCategory.name === subCategory.name) {
        throw new ActionError('A subcategory with the same name already exists');
      } else if (existingSubCategory.url === subCategory.url) {
        throw new ActionError('A subcategory with the same URL already exists');
      }
    }

    const subCategoryDetails = await createSubCategoryInDb(subCategory);
    return subCategoryDetails;
  });

export const updateSubCategory = adminAction
  .schema(SubCategoryCreateInputSchema)
  .action(async ({ parsedInput: subCategory }) => {
    const existingSubCategory = await findSubCategoryByNameOrUrlExcludingId(
      subCategory.name,
      subCategory.url,
      subCategory.id!,
    );

    if (existingSubCategory) {
      if (existingSubCategory.name === subCategory.name) {
        throw new ActionError('A subcategory with the same name already exists');
      }
      if (existingSubCategory.url === subCategory.url) {
        throw new ActionError('A subcategory with the same URL already exists');
      }
    }

    const subCategoryDetails = await updateSubCategoryInDb(subCategory);
    return subCategoryDetails;
  });

export const getSubCategories = adminAction
  .schema(
    z
      .object({
        categoryId: z.string().optional(),
        limit: z.number().optional(),
        random: z.boolean().optional(),
      })
      .optional(),
  )
  .action(async ({ parsedInput }) => {
    if (parsedInput?.categoryId) {
      const subCategories = await getSubCategoriesByCategoryId(parsedInput.categoryId);
      return { data: subCategories };
    }

    if (parsedInput?.random) {
      const limit = parsedInput.limit || 10;
      const subCategories = await getRandomSubCategories(limit);
      return { data: subCategories };
    }

    const subCategories = await getAllSubCategories();
    return { data: subCategories };
  });

export const getSubCategory = adminAction
  .schema(SubCategoryIdSchema)
  .action(async ({ parsedInput }) => {
    const subCategory = await getSubCategoryById(parsedInput.subCategoryId);
    return { data: subCategory };
  });

export const deleteSubCategory = adminAction
  .schema(SubCategoryIdSchema)
  .action(async ({ parsedInput }) => {
    const response = await deleteSubCategoryById(parsedInput.subCategoryId);
    return response;
  });
