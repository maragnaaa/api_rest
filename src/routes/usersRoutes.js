import { Router } from "express";
import { usersController } from "../controllers/usersController.js";

const router = Router();

router.get("/", usersController.index);
router.get("/:id_", usersController.show);
router.post("/", usersController.store);
router.put("/:id_", usersController.update);
router.delete("/:id_", usersController.destroy);

export default router;