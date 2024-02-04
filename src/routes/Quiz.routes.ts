import { Router } from "express";

import { authRequired } from "../middlewares/validateToken";

import { createQuiz, quizzes } from "../controllers/quiz.controller";

import { createQuizValidator } from "../validators/quizValidator";

const router = Router();


router.post('/quizzes', authRequired, createQuizValidator, createQuiz)

router.get('/quizzes/:id', authRequired, quizzes)


export default router