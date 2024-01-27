import { Router } from "express";

import { authRequired } from "../middlewares/validateToken";


import { createClass } from "../controllers/class.controller";


import { createClassValidator } from "../validators/classValidator";


const router = Router();


router.post('/classes', authRequired, createClassValidator, createClass)


export default router