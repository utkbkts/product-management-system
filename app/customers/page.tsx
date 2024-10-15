import AnalyticsCard from "@/components/dashboard/analytics-card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import AddCustomerModal from "@/components/customer/add-customer";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/server/prismaDB";

export default async function CustomersPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const customers = await prisma.customers.findMany({});
  return (
    <section className="p-6">
      <AnalyticsCard
        title="Customers"
        subTitle="Showing all customers with orders"
      >
        <AddCustomerModal />
        <DataTable columns={columns} data={customers} />
      </AnalyticsCard>
    </section>
  );
}
