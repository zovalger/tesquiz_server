import { Request, Response } from "express";
import Admin, { IAdmin } from "../models/admin.model";

export const AuthClassPermission = async (req: Request, _res: Response) => {
  const loggedInUserId = req.user?.id;

  const isAdmin: IAdmin | null = await Admin.findById(loggedInUserId);

  if (!isAdmin) {
    throw new Error("Usuario no autorizado");
  }

  if (isAdmin.role !== "Admin") {
    throw new Error("Usuario no autorizado");
  }

  if (!isAdmin.permissions.includes("Classe")) {
    throw new Error(
      "No tienes permisos para interactuar con el módulo 'Classes'"
    );
  }
};
