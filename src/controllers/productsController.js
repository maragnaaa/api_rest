import { productsServices } from "../services/productsServices.js"

async function index(req, res, next) {
    try {
        const products = await productsServices.listProducts();
        return res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

async function showByCode(req, res, next) {
    try {
        const { code } = req.params;
        const productsByCode = await productsServices.getProductByCode(code);
        return res.status(200).json(productsByCode);
    } catch (error) {
        next(error);
    }
}

async function showByName(req, res, next) {
    try {
        const { name } = req.params;
        const productsByName = await productsServices.getProductByName(name);
        return res.status(200).json(productsByName);
    } catch (error) {
        next(error);
    }
}

async function store(req, res, next) {
    try {
        const newProduct = await productsServices.createProduct(req.body);
        return res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const { code } = req.params;
        const data = req.body;
        const updatedProduct = await productsServices.updateProduct(code, data);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
}

async function destroy(req, res, next) {
    try {
        const { code } = req.params;
        await productsServices.deleteProduct(code);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}

const productsController = {
    index,
    showByCode,
    showByName,
    store,
    update,
    destroy
}

export { productsController };