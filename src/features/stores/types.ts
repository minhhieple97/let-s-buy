import { StoreUpdateSchema } from './schemas';

import { z } from 'zod';

export type IStoreDefaultShippingType = {
  defaultShippingService?: string;
  defaultShippingFeePerItem?: number;
  defaultShippingFeeForAdditionalItem?: number;
  defaultShippingFeePerKg?: number;
  defaultShippingFeeFixed?: number;
  defaultDeliveryTimeMin?: number;
  defaultDeliveryTimeMax?: number;
  returnPolicy?: string;
};

export type IStoreUpdate = z.infer<typeof StoreUpdateSchema>;
