import AnalyticsCard from "@/components/dashboard/analytics-card";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/server/prismaDB";
import AddOrder from "@/components/orders/add-order";

const Orders = async () => {
  const session = await auth();
  if (!session) redirect("/login");
  const orders = await prisma.orders.findMany({});
  return (
    <AnalyticsCard title="Products" subTitle="Showing All Products">
      <AddOrder />
      <DataTable columns={columns} data={orders} />
    </AnalyticsCard>
  );
};

export default Orders;
