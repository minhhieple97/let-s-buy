import { IDashboardSidebarMenu } from '@/lib/types';
import { routes } from '@/config/routes';

export const adminDashboardSidebarOptions: IDashboardSidebarMenu[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    link: routes.admin.dashboard,
  },
  {
    label: 'Stores',
    icon: 'store',
    link: routes.seller.dashboard,
  },
  {
    label: 'Orders',
    icon: 'box-list',
    link: routes.admin.orders,
  },
  {
    label: 'Categories',
    icon: 'categories',
    link: routes.admin.categories,
  },
  {
    label: 'Sub-Categories',
    icon: 'categories',
    link: routes.admin.subCategories,
  },
  {
    label: 'Offer Tags',
    icon: 'offer',
    link: routes.admin.offerTags,
  },
  {
    label: 'Coupons',
    icon: 'coupon',
    link: routes.admin.coupons,
  },
  {
    label: 'Products',
    icon: 'products',
    link: routes.admin.products,
  },
  {
    label: 'Customers',
    icon: 'users',
    link: routes.admin.customers,
  },
  {
    label: 'Settings',
    icon: 'settings',
    link: routes.admin.settings,
  },
];

export const SellerDashboardSidebarOptions: IDashboardSidebarMenu[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    link: '',
  },
  {
    label: 'Products',
    icon: 'products',
    link: 'products',
  },
  {
    label: 'Orders',
    icon: 'box-list',
    link: 'orders',
  },
  {
    label: 'Inventory',
    icon: 'inventory',
    link: 'inventory',
  },
  {
    label: 'Coupons',
    icon: 'coupon',
    link: 'coupons',
  },
  {
    label: 'Shipping',
    icon: 'shipping',
    link: 'shipping',
  },
  {
    label: 'Settings',
    icon: 'settings',
    link: 'settings',
  },
];

 export enum RoleType {
   ADMIN = 'ADMIN',
   SELLER = 'SELLER',
 }