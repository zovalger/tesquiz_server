import bcrypt from "bcrypt";

import { AdminUserAttributes_create } from "../../types";
import AdminModel from "../models/admin.model";

export const createAdmin_service = async (data: AdminUserAttributes_create) => {
	const { email, username, password } = data;
	try {
		const existUser = await AdminModel.findOne({
			$or: [{ email }, { username }],
		});

		if (existUser) return;

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const newAdmin = new AdminModel({
			...data,
			password: hash,
		});

		await newAdmin.save();

		return newAdmin;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getAdmins_service = async () => {
	try {
		const admins = await AdminModel.find({}, { password: 0 }).sort({
			firstName: 1,
		});

		return admins;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getAdmin_By_Id_service = async (_id: string) => {
	try {
		const admin = await AdminModel.findById(_id);

		return admin;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getAdmin_By_email_service = async (email: string) => {
	try {
		const admin = await AdminModel.findOne({ email });

		return admin;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const updateAdmin_service = async (
	_id: string,
	data: AdminUserAttributes_create
) => {
	try {
		const { firstName, lastName, username, email, permissions } = data;

		const admin = await AdminModel.findById(_id);

		if (!admin) return;

		admin.firstName = firstName;
		admin.lastName = lastName;
		admin.username = username;
		admin.email = email;
		admin.permissions = permissions;

		await admin.save();

		return admin;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const deleteAdmin_service = async (_id: string) => {
	try {
		const admin = await AdminModel.findById(_id);

		if (!admin) return;

		await AdminModel.deleteOne({ _id });

		return;
	} catch (error) {
		console.log(error);
		return;
	}
};
