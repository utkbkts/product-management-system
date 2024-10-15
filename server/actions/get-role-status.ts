"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { prisma } from "../prismaDB";

export const getRoleStatus = async () => {
  const session = await auth();

  if (!session || !session.user?.email) {
    throw new Error("No session or user email found");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      role: true,
    },
  });

  if (!user) {
    redirect("/login");
  }
  return user.role === "admin";
};
