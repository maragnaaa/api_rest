import { Router } from "express";
import { usersController } from "../controllers/usersController.js";

const usersRoutes = Router();

usersRoutes.get("/", usersController.index);
usersRoutes.get("/id/:id_", usersController.showById);
usersRoutes.get("/name/:name", usersController.showByName);
usersRoutes.post("/", usersController.store);
usersRoutes.put("/:id_", usersController.update);
usersRoutes.delete("/:id_", usersController.destroy);

export default usersRoutes;