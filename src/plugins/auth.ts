import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: string;
      email: string;
      role: 'USER' | 'ADMIN';
    };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    isAdmin: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}


async function authPlugin(app: FastifyInstance) {
  // Décorateur pour vérifier si l'utilisateur est authentifié
  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  app.decorate('isAdmin', async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.user.role !== 'ADMIN') {
      reply.code(403).send({ message: 'Accès interdit : Administrateurs uniquement' });
    }
  });
}

export default fp(authPlugin);