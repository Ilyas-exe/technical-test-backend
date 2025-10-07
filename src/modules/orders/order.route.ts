import { FastifyInstance } from 'fastify';
import {
  createOrderHandler,
  getOrderHandler,
  payOrderHandler,
} from './order.controller';
import { createOrderSchema, getOrderParamsSchema } from './order.schema';

export async function orderRoutes(app: FastifyInstance) {
  app.addHook('preHandler', app.authenticate);

  // Route to create a new order
  app.post(
    '/',
    {
      schema: {
        body: createOrderSchema,
      },
    },
    createOrderHandler
  );

  // Route to get a single order
  app.get(
    '/:id',
    {
      schema: {
        params: getOrderParamsSchema,
      },
    },
    getOrderHandler
  );

  // Route to mark an order as paid
  app.post(
    '/:id/pay',
    {
      schema: {
        params: getOrderParamsSchema,
      },
    },
    payOrderHandler
  );
}