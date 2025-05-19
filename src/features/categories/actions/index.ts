'use server';

import { ActionError, adminAction } from '@/lib/safe-action';
import { z } from 'zod';
import { CategoryCreateInputSchema } from '@/schemas';
import { CategoryIdSchema } from '../schemas';
import {
  findCategoryByNameOrUrl,
  findCategoryByNameOrUrlExcludingId,
  createCategoryInDb,
  updateCategoryInDb,
  findStoreByUrl,
  getCategoriesByStoreId,
  getSubCategoriesByCategoryId,
  getCategoryById,
  deleteCategoryById,
} from '../db';

export const createCategory = adminAction
  .schema(CategoryCreateInputSchema)
  .action(async ({ parsedInput: category }) => {
    const existingCategory = await findCategoryByNameOrUrl(category.name, category.url);

    if (existingCategory) {
      if (existingCategory.name === category.name) {
        throw new ActionError('A category with the same name already exists');
      } else if (existingCategory.url === category.url) {
        throw new ActionError('A category with the same URL already exists');
      }
    }

    const categoryDetails = await createCategoryInDb(category);
    return categoryDetails;
  });

export const updateCategory = adminAction
  .schema(CategoryCreateInputSchema)
  .action(async ({ parsedInput: category }) => {
    const existingCategory = await findCategoryByNameOrUrlExcludingId(
      category.name,
      category.url,
      category.id,
    );

    if (existingCategory) {
      if (existingCategory.name === category.name) {
        throw new ActionError('A category with the same name already exists');
      }
      if (existingCategory.url === category.url) {
        throw new ActionError('A category with the same URL already exists');
      }
    }

    const categoryDetails = await updateCategoryInDb(category);
    return categoryDetails;
  });

export const getAllCategories = adminAction
  .schema(
    z
      .object({
        storeUrl: z.string().optional(),
      })
      .optional(),
  )
  .action(async ({ parsedInput }) => {
    try {
      let storeId: string | undefined;

      if (parsedInput?.storeUrl) {
        const store = await findStoreByUrl(parsedInput.storeUrl);

        if (!store) {
          return { data: [] };
        }

        storeId = store.id;
      }

      const categories = await getCategoriesByStoreId(storeId);
      return { data: categories };
    } catch (error) {
      return { error: 'Failed to fetch categories' };
    }
  });

export const getAllCategoriesForCategory = adminAction
  .schema(CategoryIdSchema)
  .action(async ({ parsedInput }) => {
    try {
      const subCategories = await getSubCategoriesByCategoryId(parsedInput.categoryId);
      return { data: subCategories };
    } catch (error) {
      return { error: 'Failed to fetch subcategories' };
    }
  });

export const getCategory = adminAction.schema(CategoryIdSchema).action(async ({ parsedInput }) => {
  try {
    const category = await getCategoryById(parsedInput.categoryId);
    return { data: category };
  } catch (error) {
    return { error: 'Failed to fetch category' };
  }
});

export const deleteCategory = adminAction
  .schema(CategoryIdSchema)
  .action(async ({ parsedInput }) => {
    const response = await deleteCategoryById(parsedInput.categoryId);
    return response;
  });
