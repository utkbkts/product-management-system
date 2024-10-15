"use server";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { prisma } from "../prismaDB";
import { DeleteOrderSchema, OrderSchema } from "@/types/order-schema";

export const AddOrderData = actionClient
  .schema(OrderSchema)
  .action(
    async ({
      parsedInput: { customerName, address, orderNumber, totalAmount },
    }) => {
      const existingOrder = await prisma.orders.findFirst({
        where: { orderNumber },
      });

      if (existingOrder) {
        return { error: `Order Number ${orderNumber} is already taken` };
      }
      await prisma.orders.create({
        data: {
          customerName: customerName,
          address: address,
          orderNumber: orderNumber,
          totalAmount: totalAmount,
        },
      });
      revalidatePath("/", "layout");
      return { success: `Order Number ${orderNumber} has been created` };
    }
  );

export const deleteOrder = actionClient
  .schema(DeleteOrderSchema)
  .action(async ({ parsedInput: { id } }) => {
    await prisma.orders.delete({
      where: { id: id },
    });
    revalidatePath("/", "layout");
    return;
  });
