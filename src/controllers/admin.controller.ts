import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { createAccessToken } from "../libs/jwt";

import { createElement } from "../services/logbookService";

import Admin, { IAdmin } from "../models/admin.model";


export const registerAdmin = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { firstName, lastName, username, email, password, permissions } =
		req.body;

  try {



    const existUser: IAdmin | null = await Admin.findOne({ email });
    const existUsername: IAdmin | null = await Admin.findOne({ username });

		if (existUser) {
			res.status(400).json(["El correo ingresado ya existe"]);
			return;
		}

    if (existUsername) {
      res.status(400).json(["El nombre de usuario ingresado ya existe"]);
      return;
    }

    const passwordHash = await bcryptjs.hash(password, 10);


    

		const newAdmin: IAdmin = new Admin({
			firstName,
			lastName,
			username,
			email,
			password: passwordHash,
			permissions,
		});

    const userSaved: IAdmin = await newAdmin.save();

    const token = await createAccessToken({ id: userSaved._id })

	const userId = req.user?.id;

	const filterData = {
		id: userSaved.id,
		username: userSaved.username,
		email: userSaved.email,
		permissions: userSaved.permissions
	}

    await createElement("registerAdmin", "create", userId, filterData);


    res.cookie("token", token)

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

export const loginAdmin = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {

		const userFound: IAdmin | null = await Admin.findOne({ email });

		if (!userFound) {
			res.status(400).json(["El correo no se encuentra registrado"]);
			return;
		}

		const isMatch = await bcryptjs.compare(password, userFound.password);

		if (!isMatch) {
			res.status(400).json(["Contraseña incorrecta"]);
			return;
		}

		const token = await createAccessToken({ id: userFound._id });

		res.cookie("token", token);
		res.json({
			message: "Usuario logueado correctamente",
			data: {
				...JSON.parse(JSON.stringify(userFound)), 
				password: undefined,
			},
			token,
		});
	} catch (error: any) {
		res.status(500).json({ message: error.message });
		console.log(error);
	}
};
