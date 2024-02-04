import { body } from "express-validator";

export const reportClassValidator = [
  body("message")
    .exists()
    .isString()
    .notEmpty()
    .withMessage("Es necesario un mensaje"),
];
