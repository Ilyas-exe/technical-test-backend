import { FastifyInstance } from 'fastify';
import {
  registerHandler,
  loginHandler,
  getMeHandler,
  getAllUsersHandler,
} from './auth.controller';
import { registerUserSchema, loginUserSchema } from './auth.schema';

export async function authRoutes(app: FastifyInstance) {
  // Route for user registration
  app.post(
    '/register',
    {
      schema: {
        body: registerUserSchema, 
      },
    },
    registerHandler
  );

  // Route for user login
  app.post(
    '/login',
    {
      schema: {
        body: loginUserSchema, 
      },
    },
    loginHandler
  );

  
  app.get(
    '/me',
    {
      preHandler: [app.authenticate], 
    },
    getMeHandler
  );

  app.get(
    '/users',
    {
      
      preHandler: [app.authenticate, app.isAdmin],
    },
    getAllUsersHandler
  );
}