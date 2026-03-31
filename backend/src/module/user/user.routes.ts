import { Router } from "express";
import { UserController } from "./user.controller";
import { verifyToken } from "@/src/middleware/authotization.middleware";
import { verifyRole } from "@/src/middleware/role.middleware";

const router = Router();

router.get("/", verifyToken, UserController.findAll);
router.get("/:id", verifyToken, UserController.findOne);
router.post("/", verifyToken, verifyRole([1]), UserController.create);
router.put("/:id", verifyToken, verifyRole([1]), UserController.update);
router.patch("/:id", verifyToken, UserController.patch);
router.delete("/:id", verifyToken, verifyRole([1]), UserController.delete);

export default router;