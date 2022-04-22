import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const theo = await prisma.user.create({
    data: {
      username: "theo",
      password: "$2a$10$ouMBCpyRWIgiq8QSbjYcQeQ7Bnc3GeGgyz3CSYot/pMRjXI2Isb0G",
      name: "Theo",
      surname: "Giannopoulos",
      email: "te01234@hotmail.com",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
