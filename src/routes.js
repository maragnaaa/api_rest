import { Router } from "express";
import usersRoutes from "./features/users/users.routes.js";
import productsRoutes from "./features/products/products.routes.js"

const router = Router();

router.use("/users", usersRoutes);
router.use("/users", productsRoutes);

export default router 