import { body } from "express-validator";

export const classDataValidator = [
	body("title")
		.exists()
		.trim()
		.notEmpty()
		.isString()
		.withMessage("Es necesario un titulo"),

	body("content.*.type")
		.notEmpty()
		.isString()
		.withMessage("El tipo de contenido es requerido."),

	body("content.*.text")
		.notEmpty()
		.trim()
		.isString()
		.withMessage("El texto del contenido es requerido."),
];
