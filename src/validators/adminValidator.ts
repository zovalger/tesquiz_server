import { body } from "express-validator";

export const AdminDataValidator = [
	body("firstName")
		.exists()
		.trim()
		.notEmpty()
		.isString()
		.withMessage("El nombre es obligatorio"),

	body("lastName")
		.exists()
		.trim()
		.notEmpty()
		.isString()
		.withMessage("El Apellido es obligatorio"),

	body("username")
		.exists()
		.trim()
		.notEmpty()
		.isString()
		.withMessage("El nombre de usuario es obligatorio"),

	body("email")
		.exists()
		.trim()
		.notEmpty()
		.isEmail()
		.withMessage("El correo es obligatorio"),

	body("permissions")
		.notEmpty()
		.isArray({ min: 1 })
		// .isIn(["Users", "Classes", "ClassReports", "Binnacle"])
		.withMessage(
			"Es necesario por lo menos un permiso y deben cumplir con los permisos admitidos para el sistema"
		),
];

export const registerAdminValidator = [
	...AdminDataValidator,

	body("password")
		.exists()
		.notEmpty()
		.isString()
		.isLength({ min: 8 })
		.withMessage("La contraseña es obligatoria"),

	body("repeatPassword")
		.notEmpty()
		.isString()
		.custom((value, { req }) => {
			if (value != req.body.password)
				throw new Error("Las contraseñas no son iguales");

			return true;
		}),
];
