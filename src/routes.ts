import type { FastifyInstance } from 'fastify';
import { authRoutes } from './modules/auth/auth.route';
export function registerRoutes(app: FastifyInstance) {
  app.get('/', async () => ({ api: 'Visionyze Backend Candidate', status: 'OK' }));
  
  //Register the auth routes
  app.register(authRoutes, { prefix: '/auth' });
}
