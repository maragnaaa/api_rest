import { Router } from "express";
import { usersController } from "../controllers/usersController.js";

const usersRouter = Router();

router.get("/users", usersController.index);
router.get("/users/:id_", usersController.showById);
router.get("/users/:name", usersController.showByName);
router.post("/users", usersController.store);
router.put("/users/:id_", usersController.update);
router.delete("/users/:id_", usersController.destroy);

export default usersRouter;