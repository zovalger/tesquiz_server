import { body } from "express-validator";

export const registerStudentValidator = [
  body("firstName")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("El nombre es obligatorio"),
  body("lastName")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("El Apellido es obligatorio"),
  body("username")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("El nombre de usuario es obligatorio"),
  body("email")
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage("El correo es obligatorio"),
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
    })
];

export const loginStudentValidator = [
  body("email")
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage("El correo es obligatorio"),
  body("password")
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage("La contraseña es obligatoria")
];
