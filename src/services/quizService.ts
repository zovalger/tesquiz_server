import { QuizAttributes, QuizAttributes_create } from "../../types";
import QuizModel from "../models/quiz.model";

export const createQuiz_service = async (
	class_id: string,
	data: QuizAttributes_create
) => {
	try {
		const newQuiz = new QuizModel({
			...data,
			class_id,
		});

		await newQuiz.save();

		return newQuiz;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getQuizzes_service = async () => {
	try {
		const quizzes = await QuizModel.find();

		return quizzes;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getQuiz_By_Id_service = async (_id: string) => {
	try {
		const quizItem = await QuizModel.findById(_id);

		return quizItem;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getQuizzes_By_ClassId_service = async (class_id: string) => {
	try {
		const quizzes = await QuizModel.find({ class_id });

		return quizzes;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getRandomQuizzes_By_ClassId_service = async (class_id: string) => {
	try {
		const quizzes = await QuizModel.find({ class_id, $sample: { size: 3 } });

		return quizzes;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const updateQuiz_service = async (_id: string, data: QuizAttributes) => {
	try {
		const { question, incorrect, correct, timer } = data;

		const quizItem = await QuizModel.findById(_id);

		if (!quizItem) return;

		quizItem.question = question;
		quizItem.incorrect = incorrect;
		quizItem.correct = correct;
		quizItem.timer = timer;

		await quizItem.save();

		return quizItem;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const deleteQuiz_service = async (_id: string) => {
	try {
		const quizItem = await QuizModel.findById(_id);

		if (!quizItem) return;

		await QuizModel.deleteOne({ _id });

		return;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const deleteQuizzes_By_ClassId_service = async (class_id: string) => {
	try {
		return await QuizModel.deleteMany({ class_id });
	} catch (error) {
		console.log(error);
		return;
	}
};
