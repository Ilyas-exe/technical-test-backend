import { FastifyRequest, FastifyReply } from 'fastify';
import { getMetrics } from './admin.service';

export async function getMetricsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const metrics = await getMetrics();
    return metrics;
  } catch (e) {
    return reply.code(500).send(e);
  }
}