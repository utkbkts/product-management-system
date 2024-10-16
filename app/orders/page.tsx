import AnalyticsCard from "@/components/dashboard/analytics-card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/server/prismaDB";
import AddOrder from "@/components/orders/add-order";

export default async function page() {
  const session = await auth();
  if (!session) redirect("/login");
  const orders = await prisma.orders.findMany({});
  return (
    <div className="p-6">
      <AnalyticsCard title="Orders" subTitle="Showing All Orders">
        <AddOrder />
        <DataTable columns={columns} data={orders} />
      </AnalyticsCard>
    </div>
  );
}
