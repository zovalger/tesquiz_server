import { Router } from "express";
import { registerStudent, LoginStudent } from "../controllers/student.controller";

const router = Router();

router.post('/registerStudent', registerStudent);
router.get('/loginStudent', LoginStudent )


export default router