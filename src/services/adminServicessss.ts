import { Request, Response, NextFunction } from "express";
import AdminModel, { AdminModel } from "../models/admin.model";

export const AuthAdminPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loggedInUserId = req.user?.id;

    const isAdmin: AdminModel | null = await AdminModel.findById(loggedInUserId);
    if (!isAdmin) {
      res.status(400).json({ message: "Usuario no autorizado" });
      return;
    }

    if (isAdmin.role !== "Admin") {
      res.status(400).json({ message: "Usuario no autorizado" });
      return;
    }

    if (!isAdmin.permissions.includes("Users")) {
      res
        .status(400)
        .json({
          message: "No tienes permisos para interactuar con el módulo 'Users'",
        });
      return;
    }

    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
