import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin',
      role: Role.ADMIN,
      password: '$2a$12$j6Yb8a.Wce7XW.DZ37lc0uwRycYtZxcSXocUfe2tlP8LWqWsgwd1u',
      position: 'IT Admin',
      phoneNumber: '1234567890',
    },
  });
}

main()
  .then(() => console.log('Seeding complete 🌱'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  .finally(() => prisma.$disconnect());
