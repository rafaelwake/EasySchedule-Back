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

const router = Router();

router.post("/user/register", validateUserFieldsCreateAccount, create);
router.get("/user/:id", read);
router.get("/user/", AuthMiddleware, readAll);
router.put("/user/", AuthMiddleware, update);
router.delete("/user", AuthMiddleware, remove);

export default router;
