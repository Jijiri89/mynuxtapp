import { defineEventHandler, getRouterParam, createError } from "h3";
import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!Number.isFinite(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid user ID" });
  }

  // Simple version: let Prisma throw if not found, Nuxt returns 500
  // If you want a nicer 404, uncomment the check below.
  // const exists = await prisma.user.findUnique({ where: { id } });
  // if (!exists) throw createError({ statusCode: 404, statusMessage: "User not found" });

  const user = await prisma.user.delete({
    where: { id },
    select: { id: true, email: true },
  });

  return { ok: true, deleted: user };
});
