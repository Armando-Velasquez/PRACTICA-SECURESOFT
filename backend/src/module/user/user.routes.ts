import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", UserController.findAll);
router.get("/:id", UserController.findOne);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.patch("/:id", UserController.patch);
router.delete("/:id", UserController.delete);

export default router;