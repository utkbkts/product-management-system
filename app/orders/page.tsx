/* eslint-disable @typescript-eslint/no-explicit-any */
import AnalyticsCard from "@/components/dashboard/analytics-card";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/server/prismaDB";
import AddOrder from "@/components/orders/add-order";
import { columns } from "../customers/columns";
export interface Order {
  id: string;
  customerName: string;
  address: string;
  totalAmount: number;
  orderNumber: number;
  date: Date;
  isBlocked: boolean;
  image: string;
  name: string;
}
const Orders = async () => {
  const session = await auth();
  if (!session) redirect("/login");
  const orders = await prisma.orders.findMany({});
  return (
    <AnalyticsCard title="Products" subTitle="Showing All Products">
      <AddOrder />
      <DataTable columns={columns} data={orders as any} />
    </AnalyticsCard>
  );
};

export default Orders;
