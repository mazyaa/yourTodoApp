import { prisma } from "../db.js";
import bcrypt from "bcrypt";

async function seedUser() {
  const users = [
    {
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        parseInt(process.env.SALT_ROUNDS)
      ),
      role: "ADMIN",
      verified: true,
    },
    {
      name: "User",
      email: process.env.USER_EMAIL,
      password: await bcrypt.hash(
        process.env.USER_PASSWORD,
        parseInt(process.env.SALT_ROUNDS)
      ),
      role: "USER",
      verified: true,
    },
    {
      name: "User 2",
      email: process.env.USER_EMAIL_2,
      password: await bcrypt.hash(
        process.env.USER_PASSWORD_2,
        parseInt(process.env.SALT_ROUNDS)
      ),
      role: "USER",
      verified: true,
    }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: user,
    });
  }
}

async function main() {
  try {
    await seedUser();
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
