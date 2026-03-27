import { Router } from "express";
import { SeedController } from "./seed.controller";

const router = Router();

router.get("/", SeedController.seedData);

export default router;