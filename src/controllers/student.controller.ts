import { Request, Response } from "express";
import Student, { IStudent } from "../models/student.model";
import { createAccessToken } from "../libs/jwt";
import bcryptjs from "bcryptjs";

export const registerStudent = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { firstName, lastName, email, password, username } = req.body;

	try {
		const existUser: IStudent | null = await Student.findOne({ email });
		const existUsername: IStudent | null = await Student.findOne({ username });
		if (existUser) {
			res.status(400).json(["El correo ingresado ya existe"]);
			return;
		}

		if (existUsername) {
			res.status(400).json(["El nombre de usuario ingresado ya existe"]);
			return;
		}

		const passwordHash = await bcryptjs.hash(password, 10);

		const newStudent: IStudent = new Student({
			firstName,
			lastName,
			username,
			email,
			password: passwordHash,
		});

		const userSaved: IStudent = await newStudent.save();

		const token = await createAccessToken({ id: userSaved._id });

		res.cookie("token", token);

		res.json({
			message: "Se ha creado el usuario, correctamente",
			data: {
				...JSON.parse(JSON.stringify(userSaved)), 
				password: undefined,
			},
      token
		});
	} catch (error: any) {
		res.status(500).json({ message: error.message });
		console.log(error);
	}
};

export const LoginStudent = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {

	
		const studentFound: IStudent | null = await Student.findOne({email});
		if (!studentFound) {
			res.status(400).json(["El correo no existe"]);
			return;
		}

		const isMatch = await bcryptjs.compare(password, studentFound.password);

		if (!isMatch) {
			res.status(400).json(["Contraseña incorrecta"]);
			return;
		}

		const token = await createAccessToken({ id: studentFound._id });

		res.cookie("token", token);

		res.json({
			message: "Se ha realizado el Login, correctamente",
			data: {
				...JSON.parse(JSON.stringify(studentFound)), 
				password: undefined,
			},
			token,
		});
	} catch (error: any) {
		res.status(500).json({ message: error.message });
		console.log(error);
	}
};
