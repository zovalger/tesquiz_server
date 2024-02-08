import { body } from "express-validator";

export const sectionTitleValidator = [
	body("title")
		.exists()
		.notEmpty()
		.isString()
		.withMessage("Es necesario un titulo")
		.isLength({ min: 3 }),
];
