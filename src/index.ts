import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import rate from '@fastify/rate-limit';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import fastifyRedis from '@fastify/redis';

import { ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { env } from './env';
import { registerRoutes } from './routes';
import authPlugin from './plugins/auth'; 


const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();


app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(sensible);
await app.register(cors, { origin: true });
await app.register(rate, { max: 100, timeWindow: '15 minutes' });
await app.register(jwt, { secret: env.JWT_SECRET });
await app.register(fastifyRedis, { url: env.REDIS_URL });


await app.register(authPlugin);

app.get('/health', async () => ({ ok: true }));

registerRoutes(app);

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  app.log.info(`Server :${env.PORT}`);
}).catch(err => {
  app.log.error(err);
  process.exit(1);
});