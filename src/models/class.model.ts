import mongoose, { Document, Schema, model } from "mongoose";
import Admin from "./admin.model";
import SectionModel from "./section.model";

export interface IClass extends Document {
  title: string;
  order: number;
  content: Array<string>;
  created: mongoose.Schema.Types.ObjectId;
  section_id: mongoose.Schema.Types.ObjectId
}

const classSchema = new Schema<IClass>(
  {
    title: { type: String, required: true },
    order: { type: Number, required: true },
    content: [
        {
          type: { type: String, required: true },
          text: { type: String, required: true }
        }
      ],
    created: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Admin,
    },
    section_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SectionModel
    }
  },
  { timestamps: true }
);

const Class = model<IClass>("class", classSchema);

export default Class;