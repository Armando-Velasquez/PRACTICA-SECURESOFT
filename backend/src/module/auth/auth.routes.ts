import { Router } from "express";
import { AuthController } from "./auth.controller";
import { verifyToken } from "@/src/middleware/authotization.middleware";

const router = Router();

router.post("/login", AuthController.authenticate);
router.get("/token/detail", verifyToken, AuthController.tokenDetail);
router.get("/logout", AuthController.logout);
router.get("/token/renew", AuthController.tokenRenew);

export default router;