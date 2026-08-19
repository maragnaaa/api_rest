import { productsServices } from "./products.service.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

const index = asyncHandler(async (req, res) => {
    const result = await productsServices.listProducts(req.query);
    res.status(200).json(result);
});

const showByCode = asyncHandler(async (req, res) => {
    const { code } = req.params;
    const productsByCode = await productsServices.getProductByCode(code);
    res.status(200).json(productsByCode);
});

const showByName = asyncHandler(async (req, res) => {
    const { name } = req.params;
    const productsByName = await productsServices.getProductByName(name);
    res.status(200).json(productsByName);
});

const store = asyncHandler(async (req, res) => {
    const product = await productsServices.createProduct(req.body);
    res.status(201).json(product);
});

const update = asyncHandler(async (req, res) => {
    const { code } = req.params;
    const updatedProduct = await productsServices.updateProduct(code, req.body);
    res.status(200).json(updatedProduct);
});

const destroy = asyncHandler(async (req, res) => {
    const { code } = req.params;
    await productsServices.deleteProduct(code);
    res.status(204).send();
});

const productsController = {
    index,
    showByCode,
    showByName,
    store,
    update,
    destroy
}

export { productsController };