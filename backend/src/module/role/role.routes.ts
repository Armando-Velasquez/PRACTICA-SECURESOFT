import { Router } from "express";
import { RoleController } from "./role.controller";
import { validateCreateRole, validateId, validateUpdateRole } from "./role.validator";
import { hableValidation } from "@/src/middleware/validError.middleware";

const router = Router();

router.get("/", RoleController.findAll);
router.get("/:id", validateId, hableValidation, RoleController.findOne);
router.post("/", validateCreateRole, hableValidation, RoleController.create);
router.put("/:id", validateUpdateRole, hableValidation, RoleController.update);
// // router.patch("/:id", RoleController.update);
router.delete("/:id", validateId, hableValidation, RoleController.delete);

export default router;