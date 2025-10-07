import bcrypt from 'bcryptjs';
import { prisma } from '../../prisma';
import { RegisterUserInput } from './auth.schema';

// Hashes password 
export async function createUser(input: RegisterUserInput) {
  
  const hashedPassword = await bcrypt.hash(input.password, 10);

  // Create the user
  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
    },
  });

  return user;
}

// Finds a user by their email address
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}