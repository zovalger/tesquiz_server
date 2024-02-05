import { Request, Response, NextFunction } from "express";
import Admin, { IAdmin } from "../models/admin.model";

export const AuthReportClassPermission = async (
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

    if (!isAdmin.permissions.includes("ClassReports")) {
      res
        .status(400)
        .json({
          message: "No tienes permisos para leer los reportes de clases",
        });
      return;
    }
    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
