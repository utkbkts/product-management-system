import { HorizontalGraph } from "@/components/dashboard/horizontal-bar-chart";
import { PieGraph } from "@/components/dashboard/pie-chart";
import Summary from "@/components/dashboard/summary";
import { TopCustomers } from "@/components/dashboard/top-customers";
import { TopProducts } from "@/components/dashboard/top-products";
import { auth } from "@/server/auth";
import { prisma } from "@/server/prismaDB";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const customers = await prisma.customers.findMany({});
  const products = await prisma.product.findMany({});
  const orders = await prisma.orders.findMany({});
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const getUser = await prisma.user.findMany();
  const topCustomers = customers
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 4);

  const topProducts = products
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 4);

  return (
    <div className="p-4 grid gap-5">
      <Summary products={products} orders={orders} customers={customers} />
      <div className="grid lg:grid-cols-2 gap-10">
        <TopProducts
          data={topProducts.map((product) => ({
            ...product,
            image: product.image ?? "",
          }))}
        />
        <PieGraph data={getUser} />
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <TopCustomers data={topCustomers} />
        <HorizontalGraph data={getUser} />
      </div>
    </div>
  );
};

export default Home;
