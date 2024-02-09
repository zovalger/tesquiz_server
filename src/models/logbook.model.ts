import mongoose, { Document, Schema, model } from "mongoose";
import AdminModel from "./admin.model";

export interface Ilogbook extends Document {
  place: string;
  type: string;
  by: mongoose.Schema.Types.ObjectId;
  object: object;
}

const logbookSchema = new Schema<Ilogbook>(
  {
    place: { type: String, required: true },
    type: { type: String, required: true },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: AdminModel,
    },
    object: { type: Object, required: true}
  },
  { timestamps: true }
);

const Logbook = model<Ilogbook>("logbook", logbookSchema);

export default Logbook;