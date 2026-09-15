import { prisma } from '../../config/prisma.ts';
import type { CreateUserInput, UpdateUserInput } from './users.schema.ts';

export const UsersRepository = {
  async create(data: CreateUserInput) {
    return prisma.users.create({ data });
  },

  async findAllUsers() {
    return prisma.users.findMany();
  },

  async findUserById(id_code: number) {
    return prisma.users.findUnique({ where: { id_code } });
  },

  async findUserByName(name: string) {
    return prisma.users.findUnique({ where: { name } });
  },

  async update(id_code: number, data: UpdateUserInput) {
    return prisma.users.update({ where: { id_code }, data });
  },

  async delete(id_code: number) {
    return prisma.users.delete({ where: { id_code } });
  },
};
