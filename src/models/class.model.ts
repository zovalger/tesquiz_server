import mongoose, { Document, Schema, model } from "mongoose";
import { ClassAttributes } from "../../types";
import SectionModel from "./section.model";

export interface ClassModel
	extends Document,
		Omit<ClassAttributes, "_id" | "section_id"> {
	section_id: mongoose.Schema.Types.ObjectId;
}

const classSchema = new Schema<ClassModel>(
	{
		title: { type: String, required: true },
		order: { type: Number, required: true },
		content: [
			{
				type: { type: String, required: true },
				text: { type: String, required: true },
			},
		],
		section_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: SectionModel,
		},
	},
	{ timestamps: true }
);

const ClassModel = model<ClassModel>("class", classSchema);

export default ClassModel;
