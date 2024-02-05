import { Request, Response, NextFunction } from "express";
import Admin, { IAdmin } from "../models/admin.model";

export const AuthClassPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loggedInUserId = req.user?.id;

    const isAdmin: IAdmin | null = await Admin.findById(loggedInUserId);

    if (!isAdmin) {
      res.status(400).json({ message: "Usuario no autorizado" });
      return;
    }

    if (isAdmin.role !== "Admin") {
      res.status(400).json({ message: "Usuario no autorizado" });
      return;
    }

    if (!isAdmin.permissions.includes("Classes")) {
      res
        .status(400)
        .json({
          message:
            "No tienes permisos para interactuar con el módulo 'Classes'",
        });
      return;
    }
    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
