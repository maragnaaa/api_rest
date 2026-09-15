import { PrismaClient } from '../generated/prisma/client.ts';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.ENV_NODE !== 'production') globalForPrisma.prisma = prisma;
