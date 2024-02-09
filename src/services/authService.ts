import bcrypt from "bcrypt";
import { createAccessUserToken } from "../helpers/decodeUser";
import { AdminModel } from "../models/admin.model";
import { getAdmin_By_email_service } from "./adminService";

export const loginAdmin_service = async (data: {
	email: string;
	password: string;
}): Promise<{ token: string; user: AdminModel } | null> => {
	const { email, password } = data;
	try {
		const user = await getAdmin_By_email_service(email);

		if (!user) return null;

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) return null;

		const token = await createAccessUserToken(user);

		if (!token) return null;

		return { user, token };
	} catch (error: any) {
		console.log(error);

		return null;
	}
};

export const loginStudent_service = async (
	email: string,
	password: string
): Promise<{ token: string; user: AdminModel } | null> => {
	try {
		const user = await getAdmin_By_email_service(email);

		if (!user) return null;

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) return null;

		const token = await createAccessUserToken(user);

		if (!token) return null;

		return { user, token };
	} catch (error: any) {
		console.log(error);

		return null;
	}
};
