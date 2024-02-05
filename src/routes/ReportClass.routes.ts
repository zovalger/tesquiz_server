import { Router } from "express";

import { authRequired } from "../middlewares/validateToken";
import { AuthReportClassPermission } from "../services/reportService";

import { sendReportClass, reportClasses } from "../controllers/reportClass.controller";

import { reportClassValidator } from "../validators/reportClassValidator";
const router = Router();

router.get('/reportClasses', authRequired, AuthReportClassPermission, reportClasses )

router.post('/reportClass/:id', authRequired, reportClassValidator, sendReportClass )

export default router