import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { registerRoutes } from '../../routes';
import authPlugin from '../../plugins/auth';

const buildApp = () => {
  const app = Fastify().withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.register(import('@fastify/jwt'), { secret: 'test-secret' });
  app.register(authPlugin);

  registerRoutes(app as any); 

  return app;
};

describe('Auth Routes - Integration', () => {
  let app: ReturnType<typeof buildApp>;

  beforeAll(async () => {
    app = buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/register - should fail for an invalid email', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'not-an-email',
        password: 'password123',
      },
    });

    expect(response.statusCode).toBe(400);
  });
});