import { Router } from "express";
import { createClassFinished } from "../controllers/classFinishied.controller";
import { authRequired } from "../middlewares/validateToken";

import { classFinishedValidator } from "../validators/classFinishedValidator";
const router = Router();

router.post('/classFinished/:id', authRequired, classFinishedValidator,  createClassFinished)

export default router