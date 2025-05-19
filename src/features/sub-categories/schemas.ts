import { z } from 'zod';

export const SubCategoryFormSchema = z.object({
  name: z
    .string({
      required_error: 'SubCategory name is required',
      invalid_type_error: 'SubCategory name must be a string',
    })
    .min(2, { message: 'SubCategory name must be at least 2 characters long.' })
    .max(50, { message: 'SubCategory name cannot exceed 50 characters.' })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: 'Only letters, numbers, and spaces are allowed in the subCategory name.',
    }),
  image: z.object({ url: z.string() }).array().length(1, 'Choose only one subCategory image'),
  url: z
    .string({
      required_error: 'SubCategory url is required',
      invalid_type_error: 'SubCategory url must be a string',
    })
    .min(2, { message: 'SubCategory url must be at least 2 characters long.' })
    .max(50, { message: 'SubCategory url cannot exceed 50 characters.' })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        'Only letters, numbers, hyphen, and underscore are allowed in the subCategory url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.',
    }),
  categoryId: z.string().uuid(),
  featured: z.boolean(),
});

export const SubCategoryIdSchema = z.object({
  subCategoryId: z.string().uuid(),
});
