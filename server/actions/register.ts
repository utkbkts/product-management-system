"use server";

import { actionClient } from "@/lib/safe-action";
import { RegisterSchema } from "@/types/register-schema";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "../prismaDB";

export const RegisterAccount = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    const userPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    await prisma.user.create({
      data: {
        username: name,
        name: name,
        email: email,
        password: userPassword,
      },
    });
    revalidatePath("/");
  });
