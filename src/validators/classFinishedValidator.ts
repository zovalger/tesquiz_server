import { body } from "express-validator";

export const classFinishedValidator = [
    body("correct")
    .isArray()
    .withMessage("Debe guardar un valor de tipo 'Array'"),
    body("incorrect")
    .isArray()
    .withMessage("Debe guardar un valor de tipo 'Array'"),
    body("time")
    .exists()
    .notEmpty()
    .isInt()
    .withMessage("Es necesario el tiempo de finalización del quiz"),
]