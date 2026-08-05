import { usersModel } from "../models/usersModel.js";
import AppError from "../errors/appError.js";

async function listUsers() {
    return usersModel.findAllUsers();
}

async function getUserById(id_) {
    const user = await usersModel.findUserById(id_);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
}

async function getUserByName(name) {
    const user = await usersModel.findUserByName(name);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
}

async function createUser({ name, id_, admin }) {
    if (!name || !id_ ) {
        throw new AppError("Name, Id and Admin are required", 400);
    }

    const userExisting = await usersModel.findUserByName(name);
    if (userExisting) {
        throw new AppError("User already registered", 409);
    }

    return usersModel.create({ name, id_, admin });
}

async function updateUser(id_, data) {
    await getUserById(id_);
    return usersModel.update(id_, data);
}

async function deleteUser(id_) {
    await getUserById(id_);
    return usersModel.remove(id_);
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