import mongoose, { Document, Schema, model } from "mongoose";
import Admin from "./admin.model";

export interface IClass extends Document {
  title: string;
  order: Number;
  content: Array<string>;
  created: object;
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
  },
  { timestamps: true }
);

const Class = model<IClass>("class", classSchema);

export default Class;