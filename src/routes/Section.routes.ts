import { Router } from "express";

import { authRequired } from "../middlewares/validateToken";


import { createSection } from "../controllers/section.controller";


import { createSectionValidator } from "../validators/sectionValidator";


const router = Router();


router.post('/sections', authRequired, createSectionValidator, createSection)


export default router