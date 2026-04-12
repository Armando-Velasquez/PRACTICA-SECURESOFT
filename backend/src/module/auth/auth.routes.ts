import { Router } from "express";
import { AuthController } from "./auth.controller";
import { verifyToken } from "@/src/middleware/authotization.middleware";
import { limiter } from "@/src/server";

const router = Router();

router.post("/login", limiter(15, 5), AuthController.authenticate);
router.post("/admin", AuthController.admin);
router.get("/token/detail", verifyToken, AuthController.tokenDetail);
router.get("/logout", verifyToken, AuthController.logout);
router.get("/token/renew", verifyToken, AuthController.tokenRenew);

export default router;