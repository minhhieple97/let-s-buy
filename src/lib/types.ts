import {
  Cart,
  CartItem,
  Color,
  FreeShipping,
  FreeShippingCountry,
  ProductVariantImage,
  Review,
  ReviewImage,
  ShippingAddress,
  ShippingRate,
  Size,
  User,
  Country as CountryPrisma,
  Coupon,
  Store,
  OrderGroup,
  OrderItem,
  Category,
  SubCategory,
  ShippingFeeMethod,
} from '@prisma/client';

export type IDashboardSidebarMenu = {
  label: string;
  icon: string;
  link: string;
};

export type ProductWithVariantType = {
  productId: string;
  variantId: string;
  name: string;
  description: string;
  variantName: string;
  variantDescription: string;
  images: { id?: string; url: string }[];
  variantImage: string;
  categoryId: string;
  offerTagId: string;
  subCategoryId: string;
  isSale: boolean;
  saleEndDate?: string;
  brand: string;
  sku: string;
  weight: number;
  colors: { id?: string; color: string }[];
  sizes: {
    id?: string;
    size: string;
    quantity: number;
    price: number;
    discount: number;
  }[];
  product_specs: { id?: string; name: string; value: string }[];
  variant_specs: { id?: string; name: string; value: string }[];
  keywords: string[];
  questions: { id?: string; question: string; answer: string }[];
  freeShippingForAllCountries: boolean;
  freeShippingCountriesIds: { id?: string; label: string; value: string }[];
  shippingFeeMethod: ShippingFeeMethod;
  createdAt: Date;
  updatedAt: Date;
};

export type CountryWithShippingRatesType = {
  countryId: string;
  countryName: string;
  shippingRate: ShippingRate;
};

export type Country = {
  name: string;
  code: string;
  city: string;
  region: string;
};

export type VariantSimplified = {
  variantId: string;
  variantSlug: string;
  variantName: string;
  images: ProductVariantImage[];
  sizes: Size[];
};

export type VariantImageType = {
  url: string;
  image: string;
};

export type FreeShippingWithCountriesType = FreeShipping & {
  eligibaleCountries: FreeShippingCountry[];
};

export type CartProductType = {
  productId: string;
  variantId: string;
  productSlug: string;
  variantSlug: string;
  name: string;
  variantName: string;
  image: string;
  variantImage: string;
  sizeId: string;
  size: string;
  quantity: number;
  price: number;
  stock: number;
  weight: number;
  shippingMethod: string;
  shippingService: string;
  shippingFee: number;
  extraShippingFee: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  isFreeShipping: boolean;
};

export type ReviewWithImageType = Review & {
  images: ReviewImage[];
  user: User;
};

// Define a local SortOrder type
export type SortOrder = 'asc' | 'desc';

export type ReviewsFiltersType = {
  rating?: number;
  hasImages?: boolean;
};

export type ReviewsOrderType = {
  orderBy: 'latest' | 'oldest' | 'highest';
};

export type CartWithCartItemsType = Cart & {
  cartItems: CartItem[];
  coupon: (Coupon & { store: Store }) | null;
};

export type UserShippingAddressType = ShippingAddress & {
  country: CountryPrisma;
  user: User;
};

export enum OrderStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Processing = 'Processing',
  Shipped = 'Shipped',
  OutforDelivery = 'OutforDelivery',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
  Failed = 'Failed',
  Refunded = 'Refunded',
  Returned = 'Returned',
  PartiallyShipped = 'PartiallyShipped',
  OnHold = 'OnHold',
}

export enum PaymentStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Failed = 'Failed',
  Declined = 'Declined',
  Cancelled = 'Cancelled',
  Refunded = 'Refunded',
  PartiallyRefunded = 'PartiallyRefunded',
  Chargeback = 'Chargeback',
}

export type OrderGroupWithItemsType = OrderGroup & {
  items: OrderItem[];
  store: Store;
  _count: {
    items: number;
  };
  coupon: Coupon | null;
};

export enum ProductStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  ReadyForShipment = 'ReadyForShipment',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Canceled = 'Canceled',
  Returned = 'Returned',
  Refunded = 'Refunded',
  FailedDelivery = 'FailedDelivery',
  OnHold = 'OnHold',
  Backordered = 'Backordered',
  PartiallyShipped = 'PartiallyShipped',
  ExchangeRequested = 'ExchangeRequested',
  AwaitingPickup = 'AwaitingPickup',
}

export type SearchResult = {
  name: string;
  link: string;
  image: string;
};

export type OrderTableFilter = '' | 'unpaid' | 'toShip' | 'shipped' | 'delivered';

export type OrderTableDateFilter = '' | 'last-6-months' | 'last-1-year' | 'last-2-years';

export type PaymentTableFilter = '' | 'paypal' | 'credit-card';

export type PaymentTableDateFilter = '' | 'last-6-months' | 'last-1-year' | 'last-2-years';

export type ReviewFilter = '5' | '4' | '3' | '2' | '1' | '';

export type ReviewDateFilter = '' | 'last-6-months' | 'last-1-year' | 'last-2-years';

export type FiltersQueryType = {
  search: string;
  category: string;
  subCategory: string;
  offer: string;
  size: string;
  sort: string;
};

export type CatgegoryWithSubsType = Category & {
  subCategories: SubCategory[];
};

export type ProductSize = {
  size: string;
  price: number;
  discount: number;
  quantity: number;
};

export type ProductSimpleVariantType = {
  variantId: string;
  variantSlug: string;
  variantName: string;
  variantImage: string;
  images: ProductVariantImage[];
  sizes: Size[];
};

export type ProductWithVariants = {
  id: string;
  slug: string;
  name: string;
  rating: number;
  sales: number;
  numReviews: number;
  variants: {
    id: string;
    variantName: string;
    variantImage: string;
    slug: string;
    sizes: Size[];
    images: ProductVariantImage[];
  }[];
};

export type SimpleProduct = {
  name: string;
  slug: string;
  variantName: string;
  variantSlug: string;
  price: number;
  image: string;
};

export type ReviewDetailsType = {
  id: string;
  review: string;
  rating: number;
  images: { url: string }[];
  size: string;
  quantity: string;
  variant: string;
  color: string;
};

export type VariantInfoType = {
  variantName: string;
  variantSlug: string;
  variantImage: string;
  variantUrl: string;
  images: ProductVariantImage[];
  sizes: Size[];
  colors: Partial<Color>[];
};