import { Router } from "express";
import {
  create,
  read,
  update,
  remove,
} from "../controllers/appointment.controller";
import { AuthMiddleware } from "../middleware/authentication.middleware";

const router = Router();

router.post("/appointment", AuthMiddleware, create);
router.get("/appointment/:id?", AuthMiddleware, read);
router.put("/appointment", AuthMiddleware, update);
router.delete("/appointment/:id", AuthMiddleware, remove);

export default router;
