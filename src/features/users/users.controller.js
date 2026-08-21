import { usersServices } from "./users.service.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

const index = asyncHandler(async (req, res) => {
    const result = await usersServices.listUsers();
    res.status(200).json(result)
})

const showById = asyncHandler(async (req, res) => {
    const { id_code } = req.valid.params;
    const userById = await usersServices.getUserById(id_code);
    res.status(200).json(userById)
})

const showByName = asyncHandler(async (req, res) => {
    const { name } = req.valid.params;
    const userByName = await usersServices.getUserByName(name);
    res.status(200).json(userByName);
})


const store = asyncHandler(async (req, res) => {
    const user = await usersServices.createUser(req.valid.body);
    return res.status(201).json(user);  
})

const update = asyncHandler(async (req, res) => {
    const { id_code } = req.valid.params;
    const user = await usersServices.updateUser(id_code, req.valid.body);
    return res.status(200).json(user);
})

const destroy = asyncHandler(async (req, res) => {
    const { id_code } = req.valid.params;
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