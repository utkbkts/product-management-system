"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import ViewOrderModal from "@/components/orders/view-order";
import DeleteOrder from "@/components/orders/delete-order";
import { z } from "zod";
import { OrderSchema } from "@/types/order-schema";

// Define the Order type according to your OrderSchema
type OrderType = z.infer<typeof OrderSchema>;

type OrderActionsProps = {
  orderId: number | string;
  order: OrderType; // Use the correct type here
};

const OrderActions = ({ orderId, order }: OrderActionsProps) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
          <DropdownMenuItem onClick={() => setViewModalOpen(true)}>
            View Order Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
            Delete Order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="hidden">
        <DeleteOrder
          id={String(orderId)} // Convert orderId to a string
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
        />
        <ViewOrderModal
          order={order} // Pass the full order object here
          open={viewModalOpen}
          onOpenChange={setViewModalOpen}
        />
      </div>
    </>
  );
};

export default OrderActions;
