import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.controller";
import { loginAdminValidator, registerAdminValidator } from "../validators/adminValidator";
import { authRequired } from "../middlewares/validateToken";

const router = Router();

router.post('/registerAdmin',authRequired, registerAdminValidator, registerAdmin );
router.post('/loginAdmin', loginAdminValidator, loginAdmin )


export default router