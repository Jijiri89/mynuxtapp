import { defineEventHandler, readBody, createError } from "h3";
import { prisma } from "~/server/utils/prisma";

type Body = {
  name?: string;
  email?: string;
  password?: string; // optional; hash in real apps
};

export default defineEventHandler(async function (event){
  const body = (await readBody(event)) as Body;

  if (!body?.name || !body?.email) {
    throw createError({ statusCode: 400, statusMessage: "name and email are required" });
  }

  const exists = await prisma.user.findUnique({ where: { email: body.email } });
  if (exists) {
    throw createError({ statusCode: 409, statusMessage: "Email already exists" });
  }

  const user = await prisma.user.create({
    data: {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
     
    },
    select: { id: true, name: true, email: true},
  });

  return { ok: true, user };
});




// server/api/users.post.ts
/*import { defineEventHandler, readBody, createError } from "h3";
import { prisma } from "~/server/utils/prisma";

type One = { name?: string; email?: string };
type Many = One[];

export default defineEventHandler(async (event) => {
  const body = await readBody<One | Many>(event);

  // single item
  if (!Array.isArray(body)) {
    const { name, email } = body || {};
    if (!name || !email) throw createError({ statusCode: 400, statusMessage: "name and email are required" });

    try {
      const user = await prisma.user.create({
        data: { name: name.trim(), email: email.trim().toLowerCase() },
        select: { id: true, name: true, email: true },
      });
      return { ok: true, user };
    } catch (e: any) {
      if (e?.code === "P2002") throw createError({ statusCode: 409, statusMessage: "Email already exists" });
      throw createError({ statusCode: 500, statusMessage: "Failed to create user" });
    }
  }

  // array (bulk)
  if (body.length === 0) throw createError({ statusCode: 400, statusMessage: "Empty array" });

  const cleaned = body.map((u, i) => {
    if (!u?.name || !u?.email) throw createError({ statusCode: 400, statusMessage: `Row ${i + 1}: name and email are required` });
    return { name: u.name.trim(), email: u.email.trim().toLowerCase() };
  });

  // Fast path: createMany (doesn't return rows), skip duplicates
  const result = await prisma.user.createMany({
    data: cleaned,
    skipDuplicates: true, // ignores emails that already exist (unique constraint)
  });

  // Optionally fetch what now exists (by email) to return data
  const emails = cleaned.map(u => u.email);
  const users = await prisma.user.findMany({
    where: { email: { in: emails } },
    select: { id: true, name: true, email: true },
    orderBy: { id: "desc" },
  });

  return { ok: true, insertedCount: result.count, users };
});
*/