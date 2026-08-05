import { productsController } from "../controllers/productsController.js"
import { Router } from "express";

const productsRouter = Router();

router.get('/products', productsController.index);
router.get('/products/:code', productsController.showByCode);
router.get('/products/:name', productsController.showByName);
router.post('/products', productsController.store);
router.put('/products/:code', productsController.update);
router.delete('/products/:code', productsController.destroy);

export default productsRouter;