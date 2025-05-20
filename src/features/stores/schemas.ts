import { ShippingRate, StoreStatus } from '@prisma/client';

import { Store } from '@prisma/client';
import { z } from 'zod';
import { IStoreDefaultShippingType } from './types';

export const StoreSchema = z.custom<Store>();
export const StoreDefaultShippingTypeSchema = z.custom<IStoreDefaultShippingType>();
export const ShippingRateSchema = z.custom<ShippingRate>();
export const StoreUrlSchema = z.object({ storeUrl: z.string() });
export const StoreIdSchema = z.object({ storeId: z.string() });
export const StoreStatusSchema = z.object({
  storeId: z.string(),
  status: z.custom<StoreStatus>(),
});

export const StoreCreateSchema = z.object({
  name: z
    .string({
      required_error: 'Store name is required',
      invalid_type_error: 'Store name must be a string',
    })
    .min(2, { message: 'Store name must be at least 2 characters long.' })
    .max(50, { message: 'Store name cannot exceed 50 characters.' })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_ -]+$/, {
      message:
        'Only letters, numbers, space, hyphen, and underscore are allowed in the store name, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.',
    }),
  description: z
    .string({
      required_error: 'Store description is required',
      invalid_type_error: 'Store description must be a string',
    })
    .min(30, {
      message: 'Store description must be at least 30 characters long.',
    })
    .max(500, { message: 'Store description cannot exceed 500 characters.' }),
  email: z
    .string({
      required_error: 'Store email is required',
      invalid_type_error: 'Store email must be a string',
    })
    .email({ message: 'Invalid email format.' }),
  phone: z
    .string({
      required_error: 'Store phone number is required',
      invalid_type_error: 'Store phone number must be a string',
    })
    .regex(/^\+?\d+$/, { message: 'Invalid phone number format.' }),
  logo: z.string().min(1, 'Choose a logo image.').url({ message: 'Invalid logo image.' }),
  cover: z.string().min(1, 'Choose a cover image.').url({ message: 'Invalid cover image.' }),
  url: z
    .string({
      required_error: 'Store url is required',
      invalid_type_error: 'Store url must be a string',
    })
    .min(2, { message: 'Store url must be at least 2 characters long.' })
    .max(50, { message: 'Store url cannot exceed 50 characters.' })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        'Only letters, numbers, hyphen, and underscore are allowed in the store url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.',
    }),
  featured: z.boolean().default(false).optional(),
  status: z.string().default(StoreStatus.PENDING).optional(),
});

export const StoreUpdateSchema = StoreCreateSchema.extend({
  id: z.string(),
});

