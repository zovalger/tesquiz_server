import { Router } from "express";

import { authRequired } from "../middlewares/validateToken";

import { createQuiz } from "../controllers/quiz.controller";

const router = Router();


router.post('/quizzes', authRequired, createQuiz)


export default router