import mongoose, { Document, Schema, model } from "mongoose";
import Admin from "./admin.model";

export interface Ilogbook extends Document {
  place: string;
  type: string;
  by: mongoose.Schema.Types.ObjectId;
}

const logbookSchema = new Schema<Ilogbook>(
  {
    place: { type: String, required: true },
    type: { type: String, required: true },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Admin,
    },
  },
  { timestamps: true }
);

const Logbook = model<Ilogbook>("logbook", logbookSchema);

export default Logbook;