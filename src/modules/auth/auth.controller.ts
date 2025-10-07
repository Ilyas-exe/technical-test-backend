import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createUser, findUserByEmail } from './auth.service';
import { LoginUserInput, RegisterUserInput } from './auth.schema';
import { prisma } from '../../prisma';

// Handler for user register
export async function registerHandler(
  request: FastifyRequest<{ Body: RegisterUserInput }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);
    const { password, ...userWithoutPassword } = user;
    return reply.code(201).send(userWithoutPassword);
  } catch (e) {

    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return reply.code(409).send({ message: 'Un utilisateur avec cet e-mail existe déjà' });
      }
    }
    console.error(e);
    return reply.code(500).send({ message: 'An error occurred during registration' });
  }
}
// Handler for user login
export async function loginHandler(
  request: FastifyRequest<{ Body: LoginUserInput }>,
  reply: FastifyReply
) {
  const body = request.body;
  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send({ message: 'Invalid email or password' });
  }

  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);

  if (!isPasswordCorrect) {
    return reply.code(401).send({ message: 'Invalid email or password' });
  }

  const { password, ...userPayload } = user;
  const accessToken = request.server.jwt.sign(userPayload);

  return { accessToken };
}

export async function getMeHandler(request: FastifyRequest) {

  return request.user;

}

export async function getAllUsersHandler() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
  return users;
}