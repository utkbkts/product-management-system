"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { blockCustomers } from "@/server/actions/customer-actions";
import { Customer } from "@/app/customers/columns";

const BlockCustomerModal = ({
  id,
  open,
  onOpenChange,
  customers,
}: {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customers: Customer;
}) => {
  const handleDeleteCustomer = () => {
    blockCustomers({ id: id, isBlocked: !customers.isBlocked });
    toast.success(
      `${customers.isBlocked ? "Unblock success" : "Block success"}`
    );
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger>
          <Button>Block</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {customers.isBlocked ? "Unblock Customer" : "Block Customer"}
            </DialogTitle>
            <DialogDescription>
              {customers.isBlocked
                ? " Are you sure you want to unblock?"
                : " Are you sure you want to block this customer?"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={handleDeleteCustomer}>
                Yes,{" "}
                {customers.isBlocked ? "Unblock Customer" : "Block Customer"}
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlockCustomerModal;
