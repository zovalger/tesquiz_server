import { Router } from "express";

import {
	createClass_controller,
	getClasses_By_SectionId_controller,
	getClass_By_Id_controller,
	updateClassToDown_controller,
	updateClassToUp_controller,
	updateClass_controller,
	deleteClass_controller,
} from "../controllers/class.controller";
import { classDataValidator } from "../validators/classValidator";

const router = Router();

// ******************************************************
// 							Clases
// ******************************************************

router.get("/:section_id/classes", getClasses_By_SectionId_controller);
router.post("/:section_id/classes", classDataValidator, createClass_controller);

router.get("/:section_id/classes/:_id", getClass_By_Id_controller);
router.put(
	"/:section_id/classes/:_id",
	classDataValidator,
	updateClass_controller
);
router.put("/:section_id/classes/:_id/up", updateClassToUp_controller);
router.put("/:section_id/classes/:_id/down", updateClassToDown_controller);

// todo: todas las secciones con sus clases
router.get("/:section_id/classes/:_id", deleteClass_controller);

export default router;
