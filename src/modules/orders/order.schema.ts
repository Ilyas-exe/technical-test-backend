import { z } from 'zod';

// Defines a single item within an order
const orderItemSchema = z.object({
  productId: z.string().cuid(), // Expects a valid CUID, which Prisma uses for IDs
  qty: z.number().int().min(1, 'Quantity must be at least 1'),
});

// Schema for the body of the POST /orders request
export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'Order must contain at least one item'),
});

// Schema for URL parameters like /orders/:id
export const getOrderParamsSchema = z.object({
  id: z.string().cuid(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;