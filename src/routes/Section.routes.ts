import { Router } from "express";

import { authRequired } from "../middlewares/validateToken";
import { AuthClassPermission } from "../services/classService";

import { createSection, section, sections, deleteSection} from "../controllers/section.controller";


import { createSectionValidator } from "../validators/sectionValidator";


const router = Router();

router.get('/sections', authRequired, sections);
router.get('/section/:id', authRequired, section);
router.post('/sections', authRequired, createSectionValidator, AuthClassPermission, createSection);

router.delete('/section/:id', authRequired, AuthClassPermission, deleteSection)
export default router