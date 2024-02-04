import { Router } from "express";
import { logout, profile, verifyToken } from "../controllers/usersF.contoller";
const router = Router();

import { authRequired } from "../middlewares/validateToken";

router.post('/logout', logout)
router.get('/profile', authRequired, profile)
router.get('/verify', verifyToken);

export default router