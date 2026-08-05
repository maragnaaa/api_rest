import { prisma } from '../config/prisma.js'

async function findAllUsers() {
    return prisma.users.findMany();
}

async function findUserById(id_) {
    return prisma.users.findUnique({
       where: {
            id_: Number(id_)
       } 
    });
}

async function findUserByName(name) {
    return prisma.users.findUnique({
        where: {
            name
        }
    });
}

async function create(data) {
    return prisma.users.create({
        data
    });
}

async function update(id_, data) {
    return prisma.users.update({
        where: {
            id_: Number(id_)
        },
        data
    });
}

async function remove(id_) {
    return prisma.users.delete({
        where: {
            id_: Number(id_)
        }
    })
}

const usersModel = {
    findAllUsers,
    findUserById,
    findUserByName,
    create,
    update,
    remove
}

export { usersModel };