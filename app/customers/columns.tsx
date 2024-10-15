/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BlockCustomerModal from "@/components/customer/block-customer";
import { useState } from "react";
import { Order } from "../orders/page";

// Define the type for a single customer
export type Customer = {
  id: string;
  name: string;
  orders: any;
  image: string;
  isBlocked: boolean;
};

// Update CustomerActions to accept a single Customer
const CustomerActions = ({
  customerId,
  customer, // Change 'customers' to 'customer'
  onOpenChange,
}: {
  customerId: string;
  customer: Customer; // Update the type to Customer
  onOpenChange: (open: boolean) => void;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpenDeleteModal(open);
    onOpenChange(open);
  };

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
          <DropdownMenuItem onClick={() => handleOpenChange(true)}>
            {customer.isBlocked ? "Unblock Customer" : "Block Customer"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="hidden">
        <BlockCustomerModal
          id={customerId}
          customers={customer} // Change 'customers' to 'customer'
          open={openDeleteModal}
          onOpenChange={handleOpenChange}
        />
      </div>
    </>
  );
};

// Update the columns definition to reflect the change
export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "orders",
    header: "Orders",
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
          alt={`Product Image`}
          className="border-2 border-primary"
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original; // Ensure 'customer' is of type Customer
      const customerId = customer.id;
      if (!customerId) {
        return null;
      }

      return (
        <CustomerActions
          customerId={customerId}
          customer={customer} // Change 'customers' to 'customer'
          onOpenChange={() => {}}
        />
      );
    },
  },
];
