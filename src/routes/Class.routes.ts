import { Router } from "express";

import { authRequired } from "../middlewares/validateToken";


import { createClass, classes, getClass } from "../controllers/class.controller";


import { createClassValidator } from "../validators/classValidator";


const router = Router();

router.get('/classes/section:id', authRequired, classes)
router.get('/class/:id', authRequired, getClass)
router.post('/classes', authRequired, createClassValidator, createClass)


export default router