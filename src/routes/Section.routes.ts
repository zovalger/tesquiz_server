import { Router } from "express";

// import { authRequired } from "../middlewares/validateToken";
// import { AuthClassPermission } from "../services/classService";

import {
	createSection_controller,
	deleteSection_controller,
	getSection_controller,
	getSections_controller,
	updateSectionToDown_controller,
	updateSectionToUp_controller,
	updateSection_controller,
} from "../controllers/section.controller";

import { sectionTitleValidator } from "../validators/sectionValidator";

const router = Router();

router.get("/", getSections_controller);

router.post(
	"/",

	// todo: validador de usuario admin

	// AuthClassPermission,

	sectionTitleValidator,
	createSection_controller
);

router.get("/:_id", getSection_controller);

// todo: dame las clases de la seccion
// router.get("/:_id/classes", getSection_controller);

// todo: todas las secciones con sus clases
// router.get("/:_id/classes", getSection_controller);

router.put(
	"/:_id",

	// AuthClassPermission,
	// todo: ver si existe
	sectionTitleValidator,

	updateSection_controller
);
router.put("/:_id/up", updateSectionToUp_controller);
router.put("/:_id/down", updateSectionToDown_controller);

router.delete(
	"/:_id",

	// No se puede eliminar la sección si posee clases
	deleteSection_controller
);

export default router;
