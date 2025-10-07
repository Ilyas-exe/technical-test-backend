import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', password: await bcrypt.hash('admin123', 10), role: 'ADMIN' }
  });
  await prisma.product.createMany({
    data: [
      { name: 'Notebook', price_cents: 1299, stock: 100, active: true },
      { name: 'Pen', price_cents: 199, stock: 500, active: true },
      { name: 'Backpack', price_cents: 4999, stock: 25, active: true }
    ],
    skipDuplicates: true
  });
  console.log('Seeded admin id=', admin.id);
}
main().finally(()=>prisma.$disconnect());
