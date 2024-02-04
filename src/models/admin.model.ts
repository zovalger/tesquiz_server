import { Document, Schema, model} from "mongoose";

export interface IAdmin extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  permissions: Array<String>;
}

const adminSchema = new Schema<IAdmin>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default:"Admin"},
    permissions: [
      {
        type: String,
        enum: ['Users', 'Classes', 'ClassReports', 'Binnacle'],
        required: true
      },
    ],
  },
  { timestamps: true }
);

const Admin = model<IAdmin>("Admin", adminSchema);

export default Admin;
