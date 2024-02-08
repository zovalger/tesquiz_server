import { Request, Response } from "express";
import { QuizAttributes, QuizAttributes_create } from "../../types";
import { matchedData, validationResult } from "express-validator";
import {
	createQuiz_service,
	deleteQuizzes_By_ClassId_service,
	deleteQuiz_service,
	getQuizzes_By_ClassId_service,
	getQuizzes_service,
	getQuiz_By_Id_service,
	getRandomQuizzes_By_ClassId_service,
	updateQuiz_service,
} from "../services/quizService";

export const createQuiz_controller = async (req: Request, res: Response) => {
	const { class_id } = req.params;
	const data = matchedData(req) as QuizAttributes_create;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ errors: result.array() });

		const quizItem = await createQuiz_service(class_id, data);

		if (!quizItem) throw new Error("Error al crear la Clase");

		// todo: bitacora
		// const userId = req.user.id;

		// const filterData = {
		//   id: Saved.id,
		//   title: Saved.title,
		//   order: Saved.order,
		// };
		// await createElement("createQuiz", "create", userId, filterData);
		return res.json({
			message: "Clase Guardada",
			data: quizItem,
		});
	} catch (error: any) {
		console.log(error);

		return res.status(500).json({ error: true, message: error.message });
	}
};

export const getQuizzes_controller = async (_req: Request, res: Response) => {
	try {
		const quizzes = await getQuizzes_service();

		return res.status(200).json({ data: quizzes });
	} catch (error: any) {
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const getQuizzes_By_ClassId_controller = async (
	req: Request,
	res: Response
) => {
	const { class_id } = req.params;

	try {
		const quizzes = await getQuizzes_By_ClassId_service(class_id);

		return res.status(200).json({ data: quizzes });
	} catch (error: any) {
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const getRandomQuizzes_By_ClassId_controller = async (
	req: Request,
	res: Response
) => {
	const { class_id } = req.params;

	try {
		const quizzes = await getRandomQuizzes_By_ClassId_service(class_id);

		return res.status(200).json({ data: quizzes });
	} catch (error: any) {
		return res.status(500).json({ error: true, message: error.message });
	}
};
export const getQuiz_By_Id_controller = async (req: Request, res: Response) => {
	const { _id } = req.params;

	try {
		const quizItem = await getQuiz_By_Id_service(_id);

		if (!quizItem)
			return res
				.status(400)
				.json({ error: true, message: "no se encontro el quiz" });

		return res.status(200).json({ data: quizItem });
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const updateQuiz_controller = async (req: Request, res: Response) => {
	const { _id } = req.params;

	const data = matchedData(req) as QuizAttributes;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ errors: result.array() });

		const quizItem = await updateQuiz_service(_id, data);

		if (!quizItem)
			return res
				.status(400)
				.json({ error: true, message: "No se encontro la sección" });

		// const userId = req.user.id;

		// const filterData = {
		// 	id: quizItem.id,
		// 	title: req.body.title,
		// 	order: quizItem.order,
		// };

		// await createElement("UpdateQuiz", "update", userId, filterData);

		return res.json({
			message: "Se actualizo correctamente la sección",
			data: quizItem,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};

export const deleteQuiz_controller = async (req: Request, res: Response) => {
	const { _id } = req.params;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ error: true, errors: result.array() });

		const quizItem = await deleteQuiz_service(_id);

		return res.status(200).json({
			message: "Clase eliminada correctamente",
			data: quizItem,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};


export const deleteQuiz_By_ClassId_controller = async (req: Request, res: Response) => {
	const { class_id } = req.params;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.status(400).json({ error: true, errors: result.array() });

		const quizItem = await deleteQuizzes_By_ClassId_service(class_id);

		return res.status(200).json({
			message: "Clases eliminada correctamente",
			data: quizItem,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
};
