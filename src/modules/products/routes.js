import { productsController } from "../../controllers/productsController.js"
import { Router } from "express";

const productsRoutes = Router();

productsRoutes.get('/', productsController.index);
productsRoutes.get('/code/:code', productsController.showByCode);
productsRoutes.get('/name/:name', productsController.showByName);
productsRoutes.post('/', productsController.store);
productsRoutes.put('/:code', productsController.update);
productsRoutes.delete('/:code', productsController.destroy);

export default productsRoutes;