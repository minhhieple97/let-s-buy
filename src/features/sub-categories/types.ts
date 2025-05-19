import { Prisma } from '@prisma/client';
import { getAllSubCategories } from './db';

export type SubCategoryWithCategoryType = Prisma.PromiseReturnType<typeof getAllSubCategories>[0];
