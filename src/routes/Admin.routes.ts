import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.controller";

const router = Router();

router.post('/registerAdmin', registerAdmin );
router.get('/loginAdmin', loginAdmin )


export default router