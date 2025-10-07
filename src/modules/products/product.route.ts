import { FastifyInstance } from 'fastify';
import {
  createProductHandler,
  getProductsHandler,
  updateProductHandler,
} from './product.controller';
import {
  createProductSchema,
  getProductsSchema,
  updateProductSchema,
} from './product.schema';

export async function productRoutes(app: FastifyInstance) {
  // Route to get a paginated list of products (public)
  app.get(
    '/',
    {
      schema: {
        querystring: getProductsSchema,
      },
    },
    getProductsHandler
  );

  // Route to create a new product (admin only)
  app.post(
    '/',
    {
      schema: {
        body: createProductSchema,
      },
      preHandler: [app.authenticate, app.isAdmin], // Protected route
    },
    createProductHandler
  );

  // Route to update a product (admin only)
  app.patch(
    '/:id',
    {
      schema: {
        body: updateProductSchema,
      },
      preHandler: [app.authenticate, app.isAdmin], // Protected route
    },
    updateProductHandler
  );
}