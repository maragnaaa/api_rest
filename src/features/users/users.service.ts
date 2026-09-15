import { usersRepository } from './users.repository.ts';
import type { CreateUserInput, UpdateUserInput } from './users.schema.ts';
import { userDTO } from './users.dto.ts';
import { AppError } from '../../shared/errors/appError.ts';

export const usersServices = {
  async createUser(data: CreateUserInput, id_code: number) {
    const exists = await usersRepository.findUserById(id_code);

    if (exists) {
      throw new AppError('User already registered', 409);
    }

    const user = await usersRepository.create(data);
    return userDTO(user);
  },

  async listAllUsers() {
    const users = await usersRepository.findAllUsers();

    if (!users || users.length === 0) {
      throw new AppError('There are no registered users', 404);
    }

    return users.map(userDTO);
  },

  async getUsersbyName(name: string) {
    const user = await usersRepository.findUserByName(name);

    if (!user) {
      throw new AppError('User not founded', 404);
    }

    return userDTO(user);
  },

  async getUserById(id_code: number) {
    const user = await usersRepository.findUserById(id_code);

    if (!user) {
      throw new AppError('User not founded', 404);
    }

    return userDTO(user);
  },

  async updateUser(id_code: number, data: UpdateUserInput) {
    const exists = await usersRepository.findUserById(id_code);

    if (!exists) {
      throw new AppError('User not founded', 404);
    }

    const user = await usersRepository.update(id_code, data);
    return userDTO(user);
  },

  async deleteUser(id_code: number) {
    const exists = await usersRepository.findUserById(id_code);

    if (!exists) {
      throw new AppError('User not founded', 404);
    }

    return await usersRepository.delete(id_code);
  },
};
