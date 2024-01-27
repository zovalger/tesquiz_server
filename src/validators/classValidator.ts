import { body } from "express-validator";


  export const createClassValidator = [
    body("title")
      .exists()
      .notEmpty()
      .isString()
      .withMessage("Es necesario un titulo"),
    body("order")
      .exists()
      .notEmpty()
      .isInt({min: 1})
      .withMessage("Es necesario un número para su orden"),
      body('content.*.type')
      .notEmpty()
      .isString()
      .withMessage('El tipo de contenido es requerido.'),
      body('content.*.text')
      .notEmpty()
      .isString()
      .withMessage('El texto del contenido es requerido.'),
  ];