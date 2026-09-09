import { productsRepository } from "./products.repository.js";
import { toProductDTO } from "./products.dto.js";
import AppError from "../../shared/errors/appError.js";

async function listProducts() {
    const products = await productsRepository.findAllproducts();

    if (!products) {
        throw new AppError("No products registered", 404);
    }

    return products.map(toProductDTO);
}

async function getProductByCode(code) {
    const product = await productsRepository.findProductByCode(code);

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    return toProductDTO(product);
}

async function getProductByName(name) {
    const product = await productsRepository.findProductByName(name);

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    return toProductDTO(product);
}

async function createProduct(data) {
    const productExisting = await productsRepository.findProductByCode(data.code);

    if (productExisting) {
        throw new AppError("Product already registred", 409);
    }

    const product = await productsRepository.create(data);
    return toProductDTO(product);
}

async function updateProduct(code, data) {
    const productExisting = await productsRepository.findProductByCode(code);

    if (!productExisting) {
        throw new AppError("Product not found", 404);
    }
    
    const updatedProduct = await productsRepository.update(code, data);
    return toProductDTO(updatedProduct);
}

async function deleteProduct(code) {
    const productExisting = await productsRepository.findProductByCode(code);

    if (!productExisting) {
        throw new AppError("Product not found", 404);
    }

    return productsRepository.remove(code);
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
