import { body } from "express-validator";

export const authLoginValidator = [
	body("email")
		.exists()
		.notEmpty()
		.trim()
		.isEmail()
		.withMessage("El correo es obligatorio"),
    
	body("password")
		.exists()
		.notEmpty()
		.isString()
		.withMessage("La contraseña es obligatoria"),
];
