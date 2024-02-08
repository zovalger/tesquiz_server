import { Request, Response } from "express";

// import Class from "../models/class.model";
// import { createElement } from "../services/logbookService";

import { ClassAttributes, ClassAttributes_create } from "../../types";
import { matchedData, validationResult } from "express-validator";
import {
	createClass_service,
	deleteClass_service,
	getClasses_By_SectionId_service,
	getClasses_service,
	getClass_By_Id_service,
	updateClassToDown_service,
	updateClassToUp_service,
	updateClass_service,
} from "../services/classService";

export const createClass_controller = async (req: Request, res: Response) => {
	const { section_id } = req.params;
	const data = matchedData(req) as ClassAttributes_create;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ errors: result.array() });

		const classItem = await createClass_service(section_id, data);

		if (!classItem) throw new Error("Error al crear la Clase");

		// todo: bitacora
		// const userId = req.user.id;

		// const filterData = {
		//   id: Saved.id,
		//   title: Saved.title,
		//   order: Saved.order,
		// };
		// await createElement("createClass", "create", userId, filterData);
		return res.json({
			message: "Clase Guardada",
			data: classItem,
		});
	} catch (error: any) {
		console.log(error);

		return res.status(500).json({ error: true, message: error.message });
	}
};

export const getClasses_controller = async (_req: Request, res: Response) => {
	try {
		const classes = await getClasses_service();

		return res.status(200).json({ data: classes });
	} catch (error: any) {
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const getClasses_By_SectionId_controller = async (
	req: Request,
	res: Response
) => {
	const { section_id } = req.params;

	try {
		const classes = await getClasses_By_SectionId_service(section_id);

		return res.status(200).json({ data: classes });
	} catch (error: any) {
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const getClass_By_Id_controller = async (
	req: Request,
	res: Response
) => {
	const { _id } = req.params;

	try {
		const classItem = await getClass_By_Id_service(_id);

		if (!classItem)
			return res
				.status(400)
				.json({ error: true, message: "no se encontro la sección" });

		return res.status(200).json({ data: classItem });
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const updateClass_controller = async (req: Request, res: Response) => {
	const { _id } = req.params;

	const data = matchedData(req) as ClassAttributes;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ errors: result.array() });

		const classItem = await updateClass_service(_id, data);

		if (!classItem)
			return res
				.status(400)
				.json({ error: true, message: "No se encontro la sección" });

		// const userId = req.user.id;

		// const filterData = {
		// 	id: classItem.id,
		// 	title: req.body.title,
		// 	order: classItem.order,
		// };

		// await createElement("UpdateClass", "update", userId, filterData);

		return res.json({
			message: "Se actualizo correctamente la sección",
			data: classItem,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const updateClassToUp_controller = async (
	req: Request,
	res: Response
) => {
	const { _id } = req.params;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ errors: result.array() });

		const classItem = await updateClassToUp_service(_id);

		if (!classItem) throw new Error("No se puede realizar esta accion");

		// const userId = req.user.id;

		// const filterData = {
		// 	id: classItem.id,
		// 	title: req.body.title,
		// 	order: classItem.order,
		// };

		// await createElement("UpdateClass", "update", userId, filterData);

		return res.json({
			message: "Se actualizo correctamente la sección",
			data: classItem,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const updateClassToDown_controller = async (
	req: Request,
	res: Response
) => {
	const { _id } = req.params;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ errors: result.array() });

		const classItem = await updateClassToDown_service(_id);

		if (!classItem) throw new Error("No se puede realizar esta accion");

		// const userId = req.user.id;

		// const filterData = {
		// 	id: classItem.id,
		// 	title: req.body.title,
		// 	order: classItem.order,
		// };

		// await createElement("UpdateClass", "update", userId, filterData);

		return res.json({
			message: "Se actualizo correctamente la sección",
			data: classItem,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const deleteClass_controller = async (req: Request, res: Response) => {
	const { _id } = req.params;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ error: true, errors: result.array() });

		const classItem = await deleteClass_service(_id);

		return res.status(200).json({
			message: "Clase eliminada correctamente",
			data: classItem,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};
