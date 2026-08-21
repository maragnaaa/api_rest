import { usersRepository } from "./users.repository.js"
import AppError from "../../shared/errors/appError.js";
import { toUserDTO } from "./users.dto.js";

async function listUsers() {
    const users = await usersRepository.findAllUsers();

    if (!users) {
        throw new AppError("Users not registered", 404);
    }

    return users;
}

async function getUserById(id_code) {
    const user = await usersRepository.findUserById(id_code);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return toUserDTO(user);
}

async function getUserByName(name) {
    const user = await usersRepository.findUserByName(name);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return toUserDTO(user);
}

async function createUser(data) {
    const userExisting = await usersRepository.findUserByName(data.name);

    if (userExisting) {
        throw new AppError("User already registered", 409);
    }

    const user = await usersRepository.create(data)
    return toUserDTO(user);
}

async function updateUser(id_code, data) {
    const userExisting = await usersRepository.findUserById(id_code);
    
    if (!userExisting) {
        throw new AppError("User not found", 404);
    }

    const updatedUser = await usersRepository.update(id_code, data)
    return toUserDTO(updatedUser);
}

async function deleteUser(id_code) {
    const userExisting = await usersRepository.findUserById(id_code);
    
    if (!userExisting) {
        throw new AppError("User not found", 404);
    }

    return usersRepository.remove(id_code);
}

const usersServices = {
    listUsers,
    getUserById,
    getUserByName,
    createUser,
    updateUser,
    deleteUser
}

export { usersServices };