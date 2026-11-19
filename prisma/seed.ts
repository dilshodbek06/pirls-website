import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const pool = new Pool({ connectionString: DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "aziza@gmail.com";
  const password = "root1234";
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    // Agar mavjud bo'lsa — ADMIN ga yangilash
    await prisma.user.update({
      where: { email },
      data: { role: "ADMIN", password: hashedPassword },
    });
    console.log("✅ Admin yangilandi:", email);
  } else {
    // Yangi ADMIN yaratish
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName: "Admin",
        age: 30,
        province: "Toshkent",
        region: "Toshkent",
        schoolName: "PIRLS Admin",
        role: "ADMIN",
      },
    });
    console.log("✅ Admin yaratildi:", email);
  }
}

main()
  .catch((e) => {
    console.error("❌ Xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
