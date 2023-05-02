import { Router } from "express";
import {
  create,
  remove,
  accept,
  unaccept,
  read,
} from "../controllers/invites.controller";
import { AuthMiddleware } from "../middleware/authentication.middleware";
/**
 * @description This is a module that exports an Express router with endpoints for handling invitations. It includes routes for creating new invitations, accepting invitations, retrieving invitations, updating accepted status of invitations, and deleting invitations. The AuthMiddleware middleware function is used to ensure that only authenticated users can access these routes.
 *
 */
const router = Router();

router.post("/invite", AuthMiddleware, create);
router.get("/invite/accept", accept);
router.get("/invite", AuthMiddleware, read);
router.put("/invite/:id", AuthMiddleware, unaccept);
router.delete("/invite/:id", AuthMiddleware, remove);

export default router;
