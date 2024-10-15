import AnalyticsCard from "@/components/dashboard/analytics-card";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import AddProducts from "@/components/products/add-products";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/server/prismaDB";

const Orders = async () => {
  const session = await auth();
  if (!session) redirect("/login");

  const product = await prisma.product.findMany({});
  return (
    <AnalyticsCard title="Products" subTitle="Showing All Products">
      <AddProducts />
      <DataTable columns={columns} data={product} />
    </AnalyticsCard>
  );
};

export default Orders;
