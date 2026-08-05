import { prisma } from "../config/prisma.js";

async function findAllproducts() {
    return prisma.products.findMany();
}

async function findProductByCode(code) {
    return prisma.products.findUnique({
        where: {
            code: Number(code)
        }
    });
}

async function findProductByName(name) {
    return prisma.products.findUnique({
        where: {
            name
        }
    });
}

async function create(data) {
    return prisma.products.create({
        data
    });
}

async function update(code, data) {
    return prisma.products.update({
        where: {
            code: Number(code)
        },
        data
    });
}

async function remove(code) {
    return prisma.products.delete({
        where: {
            code: Number(code)
        }
    });
}

const productsModel = {
    findAllproducts,
    findProductByCode,
    findProductByName,
    create,
    update,
    remove
}

export { productsModel };