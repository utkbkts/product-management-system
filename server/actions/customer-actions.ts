"use server";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { prisma } from "../prismaDB";
import { BlockCustomerSchema, CustomersSchema } from "@/types/customer-schema";

export const addCustomer = actionClient
  .schema(CustomersSchema)
  .action(async ({ parsedInput: { name, image, orders } }) => {
    if (!image.trim()) {
      return { error: "Image is required" };
    }
    await prisma.customers.create({
      data: {
        name: name,
        image: image,
        orders: orders,
      },
    });

    revalidatePath("/", "layout");
    return { success: `Customer ${name} has been created` };
  });

export const blockCustomers = actionClient
  .schema(BlockCustomerSchema)
  .action(async ({ parsedInput: { id, isBlocked } }) => {
    await prisma.customers.update({
      where: { id: id },
      data: { isBlocked: isBlocked },
    });
    revalidatePath("/", "layout");
    return;
  });
