import { Document, Schema, model } from "mongoose";

export interface IStudent extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

const studentSchema = new Schema<IStudent>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default:"Student"},
  },
  { timestamps: true }
);

const Student = model<IStudent>("Student", studentSchema);

export default Student;
