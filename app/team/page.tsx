import TeamList from "@/components/teams/teams-list";
import { getRoleStatus } from "@/server/actions/get-role-status";
import { auth } from "@/server/auth";
import { prisma } from "@/server/prismaDB";
import { TeamSchema } from "@/types/team-schema";
import { redirect } from "next/navigation";
import { z } from "zod";

export type Team = z.infer<typeof TeamSchema>;

export default async function page() {
  const team = await prisma.user.findMany({});
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const role = await getRoleStatus();
  return (
    <div className="p-6">
      <TeamList data={team} role={role} />
    </div>
  );
}
