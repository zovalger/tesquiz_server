import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.controller";
import { loginAdminValidator, registerAdminValidator } from "../validators/adminValidator";

const router = Router();

router.post('/registerAdmin', registerAdminValidator, registerAdmin );
router.post('/loginAdmin', loginAdminValidator, loginAdmin )


export default router