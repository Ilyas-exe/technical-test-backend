import { FastifyReply, FastifyRequest } from 'fastify';
import { createOrder, getOrder, payOrder } from './order.service';
import { CreateOrderInput } from './order.schema';

// Handler for creating a new order
export async function createOrderHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const order = await createOrder(
      request.user.id,
      request.body as CreateOrderInput
    );
    return reply.code(201).send(order);
  } catch (e) {
    if (e instanceof Error) {
      return reply.code(400).send({ message: e.message });
    }
    return reply.code(500).send(e);
  }
}

// Handler for fetching a single order
export async function getOrderHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id: orderId } = request.params as { id: string };
  const order = await getOrder(orderId);

  if (!order) {
    return reply.code(404).send({ message: 'Order not found' });
  }

  if (request.user.role !== 'ADMIN' && order.userId !== request.user.id) {
    return reply.code(403).send({ message: 'Forbidden: You do not have access to this order' });
  }

  return order;
}

// Handler for marking an order as paid
export async function payOrderHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id: orderId } = request.params as { id: string };
        const order = await payOrder(orderId);
        return order;
    } catch (e) {
        return reply.code(500).send(e);
    }
}