import { usersServices } from './users.service.ts';
import type { Request, Response } from 'express';
import type {
  CreateUserInput,
  UpdateUserInput,
  NameUserInput,
  IdUserInput,
} from './users.schema.ts';

export const usersController = {
  async register(req: Request, res: Response) {
    const newUser = await usersServices.createUser(req.valid?.body as CreateUserInput);
    res.status(201).json(newUser);
  },

  async listAll(_req: Request, res: Response) {
    const listUsers = await usersServices.listAllUsers();
    res.status(200).json(listUsers);
  },

  async showByName(req: Request, res: Response) {
    const { name } = req.valid?.params as NameUserInput;
    const userName = await usersServices.getUserByName(name);
    res.status(200).json(userName);
  },

  async showById(req: Request, res: Response) {
    const { id_code } = req.valid?.params as IdUserInput;
    const userId = await usersServices.getUserById(id_code);
    res.status(200).json(userId);
  },

  async update(req: Request, res: Response) {
    const { id_code } = req.valid?.params as IdUserInput;
    const data = req.valid?.body as UpdateUserInput;
    const updateUser = await usersServices.updateUser(id_code, data);
    res.status(200).json(updateUser);
  },

  async destroy(req: Request, res: Response) {
    const { id_code } = req.valid?.params as IdUserInput;
    await usersServices.deleteUser(id_code);
    res.status(200).json({ success: 'User successfully deleted' });
  },
};
