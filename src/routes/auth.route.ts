import { Router } from "express";

import { auth } from "../controllers/auth.controller";
import { validateUserFieldsLogin } from "../middleware/validateUserFields";
/**
 * @description This code exports an instance of the Router from the Express.js framework with a single endpoint "/auth" that accepts a POST request and runs the "validateUserFieldsLogin" middleware before executing the "auth" function from the "auth.controller".
 *
 */
const router = Router();

router.post("/auth", validateUserFieldsLogin, auth);

export default router;
