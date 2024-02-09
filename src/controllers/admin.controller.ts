import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import {
	createAdmin_service,
	deleteAdmin_service,
	getAdmins_service,
	getAdmin_By_Id_service,
	updateAdmin_service,
} from "../services/adminService";
import { AdminUserAttributes_create as loginData } from "../../types";
import { loginAdmin_service } from "../services/authService";

export const createAdmin_controller = async (req: Request, res: Response) => {
	const data = matchedData(req) as loginData;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ errors: result.array() });

		const admin = await createAdmin_service(data);

		if (!admin) throw new Error("Error al crear la Clase");

		// todo: bitacora
		// const userId = req.user.id;

		// const filterData = {
		//   id: Saved.id,
		//   title: Saved.title,
		//   order: Saved.order,
		// };
		// await createElement("createAdmin", "create", userId, filterData);
		return res.json({
			message: "Clase Guardada",
			data: { ...JSON.parse(JSON.stringify(admin)), password: undefined },
		});
	} catch (error: any) {
		console.log(error);

		return res.status(500).json({ error: true, message: error.message });
	}
};

export const getAdmins_controller = async (_req: Request, res: Response) => {
	try {
		const admins = await getAdmins_service();

		return res.status(200).json({ data: admins });
	} catch (error: any) {
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const getAdmin_By_Id_controller = async (
	req: Request,
	res: Response
) => {
	const { _id } = req.params;

	try {
		const admin = await getAdmin_By_Id_service(_id);

		if (!admin)
			return res
				.status(400)
				.json({ error: true, message: "no se encontro el admin" });

		return res.status(200).json({
			data: { ...JSON.parse(JSON.stringify(admin)), password: undefined },
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const updateAdmin_controller = async (req: Request, res: Response) => {
	const { _id } = req.params;

	const data = matchedData(req) as loginData;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ errors: result.array() });

		const admin = await updateAdmin_service(_id, data);

		if (!admin)
			return res
				.status(400)
				.json({ error: true, message: "No se encontro la sección" });

		// const userId = req.user.id;

		// const filterData = {
		// 	id: admin.id,
		// 	title: req.body.title,
		// 	order: admin.order,
		// };

		// await createElement("UpdateAdmin", "update", userId, filterData);

		return res.json({
			message: "Se actualizo correctamente la sección",
			data: { ...JSON.parse(JSON.stringify(admin)), password: undefined },
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const deleteAdmin_controller = async (req: Request, res: Response) => {
	const { _id } = req.params;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ error: true, errors: result.array() });

		await deleteAdmin_service(_id);

		return res.status(200).json({
			message: "user eliminada correctamente",
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const loginAdmin_controller = async (req: Request, res: Response) => {
	const data = matchedData(req) as loginData;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ errors: result.array() });

		const session = await loginAdmin_service(data);

		if (!session)
			return res
				.status(400)
				.json({ error: true, message: "no se encontro el admin" });

		const { user } = session;

		return res.status(200).json({
			...session,
			user: { ...JSON.parse(JSON.stringify(user)), password: undefined },
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};
