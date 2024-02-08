import { Request, Response } from "express";

// import Class from "../models/class.model";
// import { createElement } from "../services/logbookService";

import { SectionAttributes, SectionAttributes_create } from "../../types";
import { matchedData, validationResult } from "express-validator";
import {
	createSection_service,
	deleteSection_service,
	getSection_service,
	getSections_service,
	updateSectionToDown_service,
	updateSectionToUp_service,
	updateSection_service,
} from "../services/sectionService";

export const createSection_controller = async (req: Request, res: Response) => {
	const data = matchedData(req) as SectionAttributes_create;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ errors: result.array() });

		const section = await createSection_service(data);

		if (!section) throw new Error("Error al crear la Sección");

		// todo: bitacora
		// const userId = req.user.id;

		// const filterData = {
		//   id: Saved.id,
		//   title: Saved.title,
		//   order: Saved.order,
		// };
		// await createElement("createSection", "create", userId, filterData);
		return res.json({
			message: "Sección Guardada",
			data: section,
		});
	} catch (error: any) {
		console.log(error);

		return res.status(500).json({ error: true, message: error.message });
	}
};

export const getSections_controller = async (_req: Request, res: Response) => {
	try {
		const sections = await getSections_service();

		return res.status(200).json({ data: sections });
	} catch (error: any) {
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const getSection_controller = async (req: Request, res: Response) => {
	const { _id } = req.params;

	try {
		const section = await getSection_service(_id);

		if (!section)
			return res
				.status(400)
				.json({ error: true, message: "no se encontro la sección" });

		return res.status(200).json({ data: section });
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const updateSection_controller = async (req: Request, res: Response) => {
	const { _id } = req.params;

	const data = matchedData(req) as SectionAttributes;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ errors: result.array() });

		const section = await updateSection_service(_id, data);

		if (!section)
			return res
				.status(400)
				.json({ error: true, message: "No se encontro la sección" });

		// const userId = req.user.id;

		// const filterData = {
		// 	id: section.id,
		// 	title: req.body.title,
		// 	order: section.order,
		// };

		// await createElement("UpdateSection", "update", userId, filterData);

		return res.json({
			message: "Se actualizo correctamente la sección",
			data: section,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const updateSectionToUp_controller = async (
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

		const section = await updateSectionToUp_service(_id);

		if (!section) throw new Error("No se puede realizar esta accion");

		// const userId = req.user.id;

		// const filterData = {
		// 	id: section.id,
		// 	title: req.body.title,
		// 	order: section.order,
		// };

		// await createElement("UpdateSection", "update", userId, filterData);

		return res.json({
			message: "Se actualizo correctamente la sección",
			data: section,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const updateSectionToDown_controller = async (
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

		const section = await updateSectionToDown_service(_id);

		if (!section) throw new Error("No se puede realizar esta accion");

		// const userId = req.user.id;

		// const filterData = {
		// 	id: section.id,
		// 	title: req.body.title,
		// 	order: section.order,
		// };

		// await createElement("UpdateSection", "update", userId, filterData);

		return res.json({
			message: "Se actualizo correctamente la sección",
			data: section,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const deleteSection_controller = async (req: Request, res: Response) => {
	const { _id } = req.params;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ error: true, errors: result.array() });

		const section = await deleteSection_service(_id);

		return res.status(200).json({
			message: "Sección eliminada correctamente",
			data: section,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};
