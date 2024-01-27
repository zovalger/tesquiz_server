import { body } from "express-validator";

export const createSectionValidator = [
    body("title")
      .exists()
      .notEmpty()
      .isString()
      .withMessage("Es necesario un titulo"),
    body("order")
      .exists()
      .notEmpty()
      .isInt({min: 1})
      .withMessage("Es necesario un número para su orden")
  ];