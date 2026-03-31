import { Router } from "express";
import { RoleController } from "./role.controller";
import { validateCreateRole, validateId, validateUpdateRole } from "./role.validator";
import { hableValidation } from "@/src/middleware/validError.middleware";
import { verifyToken } from "@/src/middleware/authotization.middleware";
import { verifyRole } from "@/src/middleware/role.middleware";

const router = Router();

router.get("/", verifyToken, verifyRole([1]), RoleController.findAll);
router.get("/:id", verifyToken, validateId, hableValidation, RoleController.findOne);
router.post("/", verifyToken, validateCreateRole, hableValidation, RoleController.create);
router.put("/:id", verifyToken, validateUpdateRole, hableValidation, RoleController.update);
router.delete("/:id", verifyToken, validateId, hableValidation, RoleController.delete);

export default router;