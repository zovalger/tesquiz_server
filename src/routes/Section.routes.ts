import { Router } from "express";

import { authRequired } from "../middlewares/validateToken";


import { createSection, section, sections} from "../controllers/section.controller";


import { createSectionValidator } from "../validators/sectionValidator";


const router = Router();

router.get('/sections', authRequired, sections);
router.get('/section/:id', authRequired, section);
router.post('/sections', authRequired, createSectionValidator, createSection);

export default router