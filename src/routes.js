import { Router } from "express";
import usersRoutes from "./features/users/users.routes";

const router = Router();

router.use("/users", usersRoutes);

export default router 