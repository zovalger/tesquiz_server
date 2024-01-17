import { Router } from "express";


import { authRequired } from "../middlewares/validateToken";
import { createSection } from "../controllers/class.controller";


const router = Router();

router.post('/createSection', authRequired, createSection)


export default router