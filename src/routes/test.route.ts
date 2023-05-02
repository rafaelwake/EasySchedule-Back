import { Router } from "express";

import { test } from "../controllers/test.controller";
/**
 * @description This code exports a single express router that responds to GET requests to the "/test" endpoint with the "test" function from the "test.controller" module.
 *
 */
const router = Router();

router.get("/test", test);

export default router;
