import { FastifyInstance } from 'fastify';
import { getMetricsHandler } from './admin.controller';

export async function adminRoutes(app: FastifyInstance) {
  // Define the GET /metrics route
  app.get(
    '/metrics',
    {
      preHandler: [app.authenticate, app.isAdmin],
    },
    getMetricsHandler
  );
}