import { body } from "express-validator";

export const QuizDataValidator = [
	body("question")
		.exists()
		.trim()
		.notEmpty()
		.isString()
		.withMessage("Es necesario un valor de texto"),

	body("correct")
		.exists()
		.notEmpty()
		.isArray()
		.withMessage("Es necesario valores correctos"),

	body("incorrect")
		.exists()
		.notEmpty()
		.isArray()
		.withMessage("Es necesario valores incorrectos"),

	body("timer")
		.exists()
		.notEmpty()
		.isInt()
		.withMessage("Es necesario un tiempo"),
];
