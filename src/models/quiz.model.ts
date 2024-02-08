import mongoose, { Document, Schema, model } from "mongoose";
import { QuizAttributes } from "../../types";
import ClassModel from "./class.model";

export interface QuizModel
	extends Document,
		Omit<QuizAttributes, "_id" | "class_id"> {
	class_id: mongoose.Schema.Types.ObjectId;
}

const quizSchema = new Schema<QuizModel>(
	{
		question: { type: String, required: true },
		correct: [String],
		incorrect: [String],
		timer: { type: Number, required: true, default: 30 },
		class_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: ClassModel,
		},
	},
	{ timestamps: true }
);

const QuizModel = model<QuizModel>("quiz", quizSchema);

export default QuizModel;
