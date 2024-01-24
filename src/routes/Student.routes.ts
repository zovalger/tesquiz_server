import { Router } from "express";
import { registerStudent, LoginStudent } from "../controllers/student.controller";
import { loginStudentValidator, registerStudentValidator } from "../validators/studentValidator";
const router = Router();

router.post('/registerStudent', registerStudentValidator, registerStudent);
router.post('/loginStudent', loginStudentValidator, LoginStudent )


export default router