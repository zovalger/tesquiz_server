import { Router } from "express";
import {
	createQuiz_controller,
	deleteQuiz_controller,
	getQuiz_By_Id_controller,
	getQuizzes_By_ClassId_controller,
	getRandomQuizzes_By_ClassId_controller,
	updateQuiz_controller,
} from "../controllers/quiz.controller";

import { QuizDataValidator } from "../validators/quizValidator";

const router = Router();

router.get("/:class_id/quizzes", getQuizzes_By_ClassId_controller);
router.get("/:class_id/quizzes/random", getRandomQuizzes_By_ClassId_controller);
router.get("/:class_id/quizzes/:_id", getQuiz_By_Id_controller);

router.post("/:class_id/quizzes", QuizDataValidator, createQuiz_controller);
router.put("/:class_id/quizzes/:_id", QuizDataValidator, updateQuiz_controller);
router.delete("/:class_id/quizzes/:_id", deleteQuiz_controller);

export default router;
