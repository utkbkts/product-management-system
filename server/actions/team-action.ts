"use server";

import { actionClient } from "@/lib/safe-action";
import { TeamSchema } from "@/types/team-schema";
import { prisma } from "../prismaDB";
import { revalidatePath } from "next/cache";
import { sendApprovalEmail, sendDeclineEmail } from "./email";

export const approveTeamMember = actionClient
  .schema(TeamSchema)
  .action(async ({ parsedInput: { email, name } }: any) => {
    await prisma.user.update({
      where: { email: email },
      data: { isApproved: true },
    });

    revalidatePath("/");
    await sendApprovalEmail(email, name);
    return;
  });

export const declineTeamMember = actionClient
  .schema(TeamSchema)
  .action(async ({ parsedInput: { email, name } }: any) => {
    await prisma.user.delete({
      where: { email: email },
    });

    revalidatePath("/");
    await sendDeclineEmail(email, name!);
    return;
  });

export const updateTeamMember = actionClient
  .schema(TeamSchema)
  .action(async ({ parsedInput: { email, isAdmin } }) => {
    await prisma.user.update({
      where: { email: email },
      data: { role: isAdmin ? "admin" : "user" },
    });

    revalidatePath("/");
    return;
  });

export const deleteTeamMember = actionClient
  .schema(TeamSchema)
  .action(async ({ parsedInput: { email } }) => {
    await prisma.user.delete({
      where: { email: email },
    });

    revalidatePath("/");
    return;
  });
export const blockTeamMember = actionClient
  .schema(TeamSchema)
  .action(async ({ parsedInput: { email, isBlocked } }) => {
    await prisma.user.update({
      where: { email: email },
      data: { isBlocked: isBlocked },
    });

    revalidatePath("/");
    return;
  });
