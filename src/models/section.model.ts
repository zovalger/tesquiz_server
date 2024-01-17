import mongoose, { Document, Schema, model } from "mongoose";
import Admin from "./admin.model";

export interface ISection extends Document {
  title: string;
  order: string;
  created: object;
}

const sectionSchema = new Schema<ISection>(
  {
    title: { type: String, required: true },
    order: { type: String, required: true },
    created: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Admin,
    },
  },
  { timestamps: true }
);

const Section = model<ISection>("section", sectionSchema);

export default Section;
