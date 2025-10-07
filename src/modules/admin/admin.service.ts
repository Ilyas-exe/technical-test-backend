import { prisma } from '../../prisma';

export async function getMetrics() {
  // Calculate the date for 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Use Promise.all to run all database queries in parallel for maximum speed
  const [totalUsers, ordersInLast7Days, revenueInLast7Days] = await Promise.all([
    // 1. Get the total count of users
    prisma.user.count(),

    // 2. Get the count of orders created in the last 7 days
    prisma.order.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo, // gte means "greater than or equal to"
        },
      },
    }),

    // 3. Get the sum of 'total_cents' for paid orders in the last 7 days
    prisma.order.aggregate({
      _sum: {
        total_cents: true,
      },
      where: {
        status: 'PAID',
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    }),
  ]);

  return {
    totalUsers,
    ordersInLast7Days,
    revenueInLast7Days: revenueInLast7Days._sum.total_cents || 0,
  };
}