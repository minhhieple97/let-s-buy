'use client';

import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { BadgeCheck, BadgeMinus } from 'lucide-react';

import { SubCategoryWithCategoryType } from '../types';
import { SubCategoryCellActions } from './sub-category-cell-actions';

export const SubCategoryColumns: ColumnDef<SubCategoryWithCategoryType>[] = [
  {
    accessorKey: 'image',
    header: '',
    cell: ({ row }) => {
      return (
        <div className="relative h-44 min-w-64 rounded-xl overflow-hidden">
          <Image
            src={row.original.image}
            alt=""
            width={1000}
            height={1000}
            className="w-40 h-40 rounded-full object-cover shadow-2xl"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <span className="font-extrabold text-lg capitalize">{row.original.name}</span>;
    },
  },
  {
    accessorKey: 'url',
    header: 'URL',
    cell: ({ row }) => {
      return <span>/{row.original.url}</span>;
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      return <span>{row.original.category.name}</span>;
    },
  },
  {
    accessorKey: 'featured',
    header: 'Featured',
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground flex justify-center">
          {row.original.featured ? <BadgeCheck className="stroke-green-300" /> : <BadgeMinus />}
        </span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const rowData = row.original;
      return <SubCategoryCellActions rowData={rowData} />;
    },
  },
];
