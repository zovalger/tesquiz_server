import { Router } from "express";

import { authRequired } from "../middlewares/validateToken";
import { AuthClassPermission } from "../services/classService";

import { createClass, classes, getClass } from "../controllers/class.controller";


import { createClassValidator } from "../validators/classValidator";


const router = Router();

router.get('/section/:id/classes', authRequired, classes)
router.get('/class/:id', authRequired, getClass)
router.post('/classes', authRequired, createClassValidator, AuthClassPermission, createClass)


export default router