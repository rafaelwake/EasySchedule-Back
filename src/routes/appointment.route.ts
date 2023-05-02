import { Router } from "express";
import {
  create,
  read,
  update,
  remove,
} from "../controllers/appointment.controller";
import { AuthMiddleware } from "../middleware/authentication.middleware";
/**
 * @description This code defines a router for the appointment-related routes of the application. It imports functions for creating, reading, updating, and removing appointments from a controller, and an authentication middleware for protecting these routes. The router defines endpoints for creating, reading, updating, and deleting appointments with the specified paths, and specifies that the authentication middleware must be called for each of these routes. Finally, the router is exported for use in other parts of the application.
 *
 */
const router = Router();

router.post("/appointment", AuthMiddleware, create);
router.get("/appointment/:id?", AuthMiddleware, read);
router.put("/appointment", AuthMiddleware, update);
router.delete("/appointment/:id", AuthMiddleware, remove);

export default router;
