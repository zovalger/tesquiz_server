import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";
import { sendReportClass, reportClasses } from "../controllers/reportClass.controller";

const router = Router();

router.get('/reportClasses', authRequired, reportClasses )

router.post('/reportClass/:id', authRequired, sendReportClass )

export default router