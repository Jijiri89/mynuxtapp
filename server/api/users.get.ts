// server/api/users.get.ts
import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async () => {
  const users = await prisma.user.findMany({
    orderBy: { id: "asc" },
    select: { id: true, name: true, email: true },
  });
  return { ok: true, users };
});
