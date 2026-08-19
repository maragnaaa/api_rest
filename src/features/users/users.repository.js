import { prisma } from '../../config/prisma.js'

async function findAllUsers({ skip, take }) {
    return prisma.users.findMany({ skip, take });
}

async function count() {
    return prisma.users.count();
}

async function findUserById(id_code) {
    return prisma.users.findUnique({ where: { id_code } });
}

async function findUserByName(name) {
    return prisma.users.findUnique({ where: { name } });
}

async function create(data) {
    return prisma.users.create({ data });
}

async function update(id_code, data) {
    return prisma.users.update({ where: { id_code }, data });
}

async function remove(id_code) {
    return prisma.users.delete({ where: { id_code } });
}

const usersRepository = {
    findAllUsers,
    count,
    findUserById,
    findUserByName,
    create,
    update,
    remove
}

export { usersRepository };