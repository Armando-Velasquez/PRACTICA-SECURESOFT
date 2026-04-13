import { Router } from "express";
import { MfaController } from "./mfa.controller";
import { verifyToken } from "@/src/middleware/authotization.middleware";

const router = Router();

router.post("/setup", verifyToken, MfaController.generate);
router.post("/enable", verifyToken, MfaController.enable);
router.post("/verify", MfaController.verify);

export default router;