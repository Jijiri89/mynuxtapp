import { defineEventHandler, readBody, createError, getRouterParam } from "h3";
import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const body = await readBody<{ name?: string; email?: string }>(event);

  if (!id || !body?.name || !body?.email) {
    throw createError({ statusCode: 400, statusMessage: "Invalid input" });
  }

  const updated = await prisma.user.update({
    where: { id },
    data: {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
    },
    select: { id: true, name: true, email: true },
  });

  return { ok: true, user: updated };
});
