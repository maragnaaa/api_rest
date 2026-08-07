import { productsModel } from "../../models/productsModel.js";
import AppError from "../../errors/appError.js";

async function listProducts() {
    return productsModel.findAllproducts();
}

async function getProductByCode(code) {
    const product = await productsModel.findProductByCode(code);

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    return product;
}

async function getProductByName(name) {
    const product = await productsModel.findProductByName(name);

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    return product;
}

async function createProduct({ code, name, price}) {
    if (!code || !name || !price) {
        throw new AppError("Code, name or price are missing", 400);
    }

    const productExisting = await productsModel.findProductByCode(code);

    if (productExisting) {
        throw new AppError("Product already registred", 409);
    }

    return productsModel.create({ code, name, price});
}

async function updateProduct(code, data) {
    const productExisting = await productsModel.findProductByCode(code);

    if (!productExisting) {
        throw new AppError("Product not found", 404);
    }

    return productsModel.update(code, data);
}

async function deleteProduct(code) {
    const productExisting = await productsModel.findProductByCode(code);

    if (!productExisting) {
        throw new AppError("Product not found", 404);
    }

    return productsModel.remove(code);
}

const productsServices = {
    listProducts,
    getProductByCode,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct,
}

export { productsServices };
