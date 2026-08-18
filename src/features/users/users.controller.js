import { usersServices } from "./users.service.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

const index = asyncHandler(async (req, res) => {
    const users = await usersServices.listUsers(req.body);
    res.status(200).json(users)
})

const showById = asyncHandler(async (req, res) => {
    const { id_code } = req.params;
    const userById = await usersServices.getUserById(id_code);
    res.status(200).json(userById)
})

const showByName = asyncHandler(async (req, res) => {
    const { name } = req.params;
    const userByName = await usersServices.getUserByName(name);
    res.status(200).json(userByName);
})


const store = asyncHandler(async (req, res) => {
    const user = await usersServices.createUser(req.body);
    return res.status(201).json(user);  
})

const update = asyncHandler(async (req, res) => {
    const { id_code } = req.params;
    const user = await usersServices.updateUser(id_code, req.body);
    return res.status(200).json(user);
})

const destroy = asyncHandler(async (req, res) => {
    const { id_code } = req.params;
    await usersServices.deleteUser(id_code);
    return res.status(204).send();
})

const usersController = {
    index,
    showById,
    showByName,
    store,
    update,
    destroy
}

export { usersController };