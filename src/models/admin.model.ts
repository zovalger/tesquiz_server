import { Document, Schema, model } from "mongoose";
import { AdminUserAttributes } from "../../types";

export interface AdminModel extends Document, Omit<AdminUserAttributes, "_id"> {}

const adminSchema = new Schema<AdminModel>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, required: true, default: "admin" },
		permissions: [
			{
				type: String,
				enum: ["Users", "Classes", "ClassReports", "Binnacle"],
				required: true,
			},
		],
	},
	{ timestamps: true }
);

const AdminModel = model<AdminModel>("admin", adminSchema);

export default AdminModel;
