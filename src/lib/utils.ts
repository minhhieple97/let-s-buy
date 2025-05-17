import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User } from '@clerk/nextjs/server';
import { Role } from '@prisma/client';
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getUserRole = (user: User) => {
  return user.privateMetadata?.role?.toString();
};

export const isAdmin = (user: User) => {
  return user.privateMetadata?.role?.toString() === Role.ADMIN;
};

export const isSeller = (user: User) => {
  return user.privateMetadata?.role?.toString() === Role.SELLER;
};
