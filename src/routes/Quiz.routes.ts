import { Router } from "express";

import { authRequired } from "../middlewares/validateToken";

import { createQuiz } from "../controllers/quiz.controller";

import { createQuizValidator } from "../validators/quizValidator";

const router = Router();


router.post('/quizzes', authRequired, createQuizValidator, createQuiz)


export default router