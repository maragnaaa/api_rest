import { usersServices } from "../services/usersServices.js";

async function index(req, res, next) {
    try {
        const users = await usersServices.listUsers();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

async function showById(req, res, next) {
    try {
       const { id_ } = req.params;
       const userById = await usersServices.getUserById(id_);
       return res.status(200).json(userById);
    } catch (error) {
        next(error)
    }
}

async function showByName(req, res, next) {
    try {
        const { name } = req.params;
        const userByName = await usersServices.getUserByName(name);
        return res.status(200).json(userByName);
    } catch (error) {
        next(error);
    }
}

async function store(req, res, next) {
    try {
        const user = await usersServices.createUser(req.body);
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const { id_ } = req.params;
        const data = req.body;
        const user = await usersServices.updateUser(id_, data);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function destroy(req, res, next) {
    try {
        const { id_ } = req.params;
        await usersServices.deleteUser(id_);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}

const usersController = {
    index,
    showById,
    showByName,
    store,
    update,
    destroy
}

export { usersController };