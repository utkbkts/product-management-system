/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import { useState } from "react";
import EditProduct from "@/components/products/edit-products";
import DeleteProduct from "@/components/products/delete-products";

export type Products = {
  id: string | number | undefined;
  name: string;
  price: number;
  revenue: number;
  image: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amountCell = row.getValue("price") as number;
      return <span>{formatPrice(amountCell)}</span>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;
      return (
        <Image
          src={imageUrl}
          width={50}
          height={50}
          alt="product image"
          className="border-2 border-primary"
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const productId = product.id;
      const [editModalOpen, setEditModalOpen] = useState(false);
      const [deleteModalOpen, setDeleteModalOpen] = useState(false);

      if (!productId) {
        return;
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setEditModalOpen(true)}>
                Edit Product
              </DropdownMenuItem>{" "}
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => setDeleteModalOpen(true)}
              >
                delete product
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                view product Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden">
            <EditProduct
              id={productId}
              product={product}
              open={editModalOpen}
              onOpenChange={setEditModalOpen}
            />
            <DeleteProduct
              id={productId}
              open={deleteModalOpen}
              onOpenChange={setDeleteModalOpen}
            />
          </div>
        </>
      );
    },
  },
];
