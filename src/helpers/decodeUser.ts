import jwt from "jsonwebtoken";
import { userAttributes } from "../../types";
import { TOKEN_SECRET } from "../config";
import { getAdmin_By_Id_service } from "../services/adminService";
import { AdminModel } from "../models/admin.model";

export const decodeUserAdmin = async (
	token: string
): Promise<AdminModel | null> => {
	try {
		const seudoUser = jwt.verify(token, TOKEN_SECRET);

		const a = seudoUser as Pick<userAttributes, "_id">;

		const admin = await getAdmin_By_Id_service(a._id);

		if (!admin) return null;

		return admin;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createAccessUserToken = async (
	user: userAttributes
): Promise<string | null> => {
	const { _id } = user;

	try {
		const token = await jwt.sign({ _id }, TOKEN_SECRET, { expiresIn: "1h" });

		return token;
	} catch (error) {
		console.log(error);

		return null;
	}
};
