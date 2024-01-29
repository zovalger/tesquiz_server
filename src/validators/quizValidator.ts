import { body } from "express-validator";


  export const createQuizValidator = [
    body("text")
      .exists()
      .notEmpty()
      .isString()
      .withMessage("Es necesario un valor de texto"),
    body("corret")
    .exists()
    .notEmpty()
    .isArray()
    .withMessage("Es necesario valores correctos"),
    body("incorret")
    .exists()
    .notEmpty()
    .isArray()
    .withMessage("Es necesario valores incorrectos"),
    body("time")
    .exists()
    .notEmpty()
    .isInt()
    .withMessage("Es necesario un tiempo"),
  ];