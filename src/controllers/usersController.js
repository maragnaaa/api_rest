import { usersServices } from "../services/usersServices.js";

async function index(req, res, next) {
    try {
        const users = await usersServices.listUsers();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

async function show(req, res, next) {
    try {
       const { id_ } = req.params;
       const user = await usersServices.getUserById(id_);
       return res.status(200).json(user);
    } catch (error) {
        next(error)
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
        const user = await usersServices.deleteUser(id_);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}

const usersController = {
    index,
    show,
    store,
    update,
    destroy
}

export { usersController };