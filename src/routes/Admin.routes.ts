import { Router } from "express";
import { authLoginValidator } from "../validators/authValidator";
import {
	createAdmin_controller,
	deleteAdmin_controller,
	getAdmin_By_Id_controller,
	getAdmins_controller,
	loginAdmin_controller,
	updateAdmin_controller,
} from "../controllers/admin.controller";
import {
	AdminDataValidator,
	registerAdminValidator,
} from "../validators/adminValidator";

const router = Router();

router.post("/register", registerAdminValidator, createAdmin_controller);
router.post("/login", authLoginValidator, loginAdmin_controller);

router.get("/", getAdmins_controller);
router.get("/:_id", getAdmin_By_Id_controller);

router.put("/:_id", AdminDataValidator, updateAdmin_controller);
router.delete("/:_id", deleteAdmin_controller);

export default router;
