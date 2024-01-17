import { Request, Response } from "express";

import Admin, { IAdmin } from "../models/admin.model";

import Section, {ISection} from "../models/section.model";

// import Class, {IClass} from "../models/class.model";

export const createSection =async (req: Request, res: Response):Promise<void> => {
    const {title, order} = req.body;

    try {

        const loggedInUserId = req.user?.id;

        const isAdmin: IAdmin | null = await Admin.findById(loggedInUserId);

        if (!isAdmin) {
            res.status(401).json({ message: "Usuario no autorizado"});
            return;
          }
      
          if (isAdmin.role !== "Admin") {
            res.status(401).json({ message: "Usuario no autorizado" });
            return;
          }
      
          if (!isAdmin.permissions.includes("create")) {
            res.status(401).json({ message: "No tienes permisos para crear una sección" });
            return;
          }

        const newSection: ISection = new Section({
            title,
            order
        })

        const Saved: ISection = await newSection.save();

        res.json({ 
            message: "Sección Guardada",
            title: Saved.title,
            order: Saved.order
        })

    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}