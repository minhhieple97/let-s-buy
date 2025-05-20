import { ShippingRate, StoreStatus } from '@prisma/client';

import { Store } from '@prisma/client';
import { z } from 'zod';
import { StoreDefaultShippingType } from './types';

export const StoreSchema = z.custom<Store>();
export const StoreDefaultShippingTypeSchema = z.custom<StoreDefaultShippingType>();
export const ShippingRateSchema = z.custom<ShippingRate>();
export const StoreUrlSchema = z.object({ storeUrl: z.string() });
export const StoreIdSchema = z.object({ storeId: z.string() });
export const StoreStatusSchema = z.object({
  storeId: z.string(),
  status: z.custom<StoreStatus>(),
});
