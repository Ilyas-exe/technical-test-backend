import { prisma } from '../../prisma';
import { CreateOrderInput } from './order.schema';

// Creates a new order and decrements product stock within a transaction
export async function createOrder(userId: string, input: CreateOrderInput) {
  const { items } = input;

  const productIds = items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  let totalCents = 0;
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found.`);
    }

    if (product.stock < item.qty) {
      throw new Error(`Not enough stock for ${product.name}. Available: ${product.stock}, Requested: ${item.qty}`);
    }

    totalCents += product.price_cents * item.qty;
  }

  const order = await prisma.$transaction(async (tx) => {

    const createdOrder = await tx.order.create({
      data: {
        userId,
        total_cents: totalCents,
        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return {
              productId: item.productId,
              qty: item.qty,
              unit_price_cents: product!.price_cents, 
            };
          }),
        },
      },
    });

    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.qty,
          },
        },
      });
    }

    return createdOrder;
  });

  return order;
}

// Finds a single order by its ID
export async function getOrder(orderId: string) {
  return prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

// Changes an order's status to PAID
export async function payOrder(orderId: string) {
    return prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID' },
    });
}