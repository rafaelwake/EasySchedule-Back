import { Router } from "express";

import {
  create,
  read,
  update,
  remove,
  readAll,
} from "../controllers/user.controller";
import { AuthMiddleware } from "../middleware/authentication.middleware";
import { validateUserFieldsCreateAccount } from "../middleware/validateUserFields";
/**
 * @description This code sets up the routes for the User resource, defining HTTP methods for creating, reading, updating and deleting user data. It also sets up a middleware function for authentication and a validation middleware for creating user accounts. The routes use the appropriate controllers for handling the logic for each endpoint.
 *
 */
const router = Router();

router.post("/user/register", validateUserFieldsCreateAccount, create);
router.get("/user/:id", read);
router.get("/user/", AuthMiddleware, readAll);
router.put("/user/", AuthMiddleware, update);
router.delete("/user", AuthMiddleware, remove);

export default router;
