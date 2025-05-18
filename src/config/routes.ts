export const routes = {
  home: '/',
  admin: {
    dashboard: '/admin/dashboard',
    categories: '/dashboard/admin/categories',
    categoryDetail: (id: string) => `/dashboard/admin/categories/${id}`,
    categoryEdit: (id: string) => `/dashboard/admin/categories/${id}/edit`,
    seller: '/admin/dashboard/seller',
    subCategories: '/admin/dashboard/sub-categories',
    products: '/admin/dashboard/products',
    orders: '/admin/dashboard/orders',
    customers: '/admin/customers',
    settings: '/admin/settings',
  },
};
