import { Router } from "express";

import { auth } from "../controllers/auth.controller";
import { validateUserFieldsLogin } from "../middleware/validateUserFields";

const router = Router();

router.post("/auth", validateUserFieldsLogin, auth);

export default router;
