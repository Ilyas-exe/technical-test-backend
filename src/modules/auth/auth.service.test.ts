import { describe, it, expect, vi } from 'vitest';
import { createUser } from './auth.service';
import { prisma } from '../../prisma';
import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

// Mock the Prisma client
vi.mock('../../prisma', () => ({
  prisma: {
    user: {
      create: vi.fn(),
    },
  },
}));


vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
  },
}));


describe('Auth Service', () => {
  it('should create a new user with a hashed password', async () => {
    const userInput = { email: 'test@example.com', password: 'password123' };
    const hashedPassword = 'hashed_password';
    const createdUser: User = {
      id: '1',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'USER',
      createdAt: new Date(),
    };

    
    
    // We use @ts-ignore because the static types are incorrect.
    // @ts-ignore
    vi.mocked(bcrypt.hash).mockResolvedValue(hashedPassword);
    vi.mocked(prisma.user.create).mockResolvedValue(createdUser);

    const result = await createUser(userInput);

    
    // @ts-ignore
    expect(bcrypt.hash).toHaveBeenCalledWith(userInput.password, 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: userInput.email,
        password: hashedPassword,
      },
    });
    expect(result).toEqual(createdUser);
  });
});