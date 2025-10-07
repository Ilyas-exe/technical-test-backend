import type { FastifyInstance } from 'fastify';
import { authRoutes } from './modules/auth/auth.route';
import { productRoutes } from './modules/products/product.route';
import { orderRoutes } from './modules/orders/order.route';

export function registerRoutes(app: FastifyInstance) {
  app.get('/', async () => ({ api: 'Visionyze Backend Candidate', status: 'OK' }));
  
  //Register the auth routes
  app.register(authRoutes, { prefix: '/auth' });

  //Register the products routes
  app.register(productRoutes, { prefix: '/products' });

  //Register the order routes
  app.register(orderRoutes, { prefix: '/orders' });
}
