import { describe, it, expect, vi } from 'vitest';
import { getMetrics } from './admin.service';
import { prisma } from '../../prisma';

vi.mock('../../prisma', () => ({
  prisma: {
    user: { count: vi.fn() },
    order: { count: vi.fn(), aggregate: vi.fn() },
  },
}));

describe('Admin Service - getMetrics', () => {
  it('should return the correct metrics', async () => {
    const mockTotalUsers = 150;
    const mockOrderCount = 25;
    
    const mockRevenue = {
      _sum: { total_cents: 50000 },
      _avg: { total_cents: null },
      _min: { total_cents: null },
      _max: { total_cents: null },
      _count: undefined, 
    };

    vi.mocked(prisma.user.count).mockResolvedValue(mockTotalUsers);
    vi.mocked(prisma.order.count).mockResolvedValue(mockOrderCount);
    vi.mocked(prisma.order.aggregate).mockResolvedValue(mockRevenue);

    const metrics = await getMetrics();

    expect(metrics.totalUsers).toBe(mockTotalUsers);
    expect(metrics.ordersInLast7Days).toBe(mockOrderCount);
    expect(metrics.revenueInLast7Days).toBe(mockRevenue._sum.total_cents);
  });
});