import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const email = process.argv[2]?.toLowerCase().trim();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password || password.length < 12) {
  console.error("Usage: set ADMIN_PASSWORD (12+ characters), then run: node --env-file=.env scripts/create-admin.mjs you@email.com");
  process.exit(1);
}

const db = new PrismaClient();
const passwordHash = await bcrypt.hash(password, 12);

await db.user.upsert({
  where: { email },
  update: { passwordHash },
  create: { email, passwordHash },
});

console.log("Admin saved:", email);
await db.$disconnect();