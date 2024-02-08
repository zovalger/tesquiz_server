import { Document, Schema, model } from "mongoose";

import { SectionAttributes } from "../../types";

export interface SectionModel
	extends Document,
		Omit<SectionAttributes, "_id"> {}

const sectionSchema = new Schema<SectionModel>(
	{
		title: { type: String, required: true },
		order: { type: Number, required: true },
	},
	{ timestamps: true }
);

const SectionModel = model<SectionModel>("section", sectionSchema);

export default SectionModel;
