import { prisma } from "../../config/prisma.js";

async function findAllproducts({ skip, take }) {
    return prisma.products.findMany({ skip, take });
}

async function count() {
    return prisma.products.count();
}

async function findProductByCode(code) {
    return prisma.products.findUnique({ where: { code } });
}

async function findProductByName(name) {
    return prisma.products.findUnique({ where: { name } });
}

async function create(data) {
    return prisma.products.create({ data });
}

async function update(code, data) {
    return prisma.products.update({ where: { code }, data });
}

async function remove(code) {
    return prisma.products.delete({ where: { code } });
}

const productsRepository = {
    findAllproducts,
    count,
    findProductByCode,
    findProductByName,
    create,
    update,
    remove
}

export { productsRepository };