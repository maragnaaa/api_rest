import { Router } from "express";
import { usersController } from "../users/users.controller.js";
import { validate } from "../../shared/middlewares/validate.js";
import { 
    createUserSchema,
    updateUserSchema,
    userIdParamSchema,
    userNameParamSchema,
    listUsersQuerySchema,
} from "./users.schema.js";

const usersRoutes = Router();

usersRoutes.get(
    "/", 
    validate(listUsersQuerySchema, "query"), 
    usersController.index
);

usersRoutes.get(
    "/id/:id_code",
    validate(userIdParamSchema, "params"), 
    usersController.showById
);

usersRoutes.get(
    "/name/:name",
    validate(userNameParamSchema, "params"), 
    usersController.showByName
);

usersRoutes.post(
    "/", 
    validate(createUserSchema, "body"), 
    usersController.store
);

usersRoutes.put(
    "/:id_code", 
    validate(userIdParamSchema, "params"), 
    validate(updateUserSchema, "body"), 
    usersController.update
);

usersRoutes.delete(
    "/:id_code", 
    validate(userIdParamSchema, "params"),
    usersController.destroy
);

export default usersRoutes;