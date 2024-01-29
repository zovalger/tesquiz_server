import { Request, Response } from "express";
import Admin, { IAdmin } from "../models/admin.model";


export const AuthReadReportPermission = async(req: Request, res: Response) =>{
  
  try {
    const loggedInUserId = req.user?.id;

    const isAdmin: IAdmin | null = await Admin.findById(loggedInUserId);

    if (!isAdmin) {
      res.status(400).json({ message: "Usuario no autorizado"})
      return
      }
  
      if (isAdmin.role !== "Admin") {
        res.status(400).json({ message: "Usuario no autorizado"})
        return
      }
  
    //   if (!isAdmin.permissions.includes("create")) {
    //     throw new Error("No tienes permisos para crear una clase");
    //   }

  } catch (error: any) {
    res.status(500).json({ message: error.message})
  }
 
}