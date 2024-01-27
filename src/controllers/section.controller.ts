import { Request, Response } from "express";

import Admin, { IAdmin } from "../models/admin.model";

import Section, {ISection} from "../models/section.model";


export const createSection =async (req: Request, res: Response):Promise<void> => {
    const {title} = req.body;

    try {

        const loggedInUserId = req.user?.id;

        const isAdmin: IAdmin | null = await Admin.findById(loggedInUserId);


        const allSection = await Section.find().sort({ order: -1 });

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

          const orderSection =  (allSection.length > 0) ? allSection[0].order + 1 : 1

        const newSection: ISection = new Section({
            title,
            order: orderSection
        })

        const Saved: ISection = await newSection.save();

        res.json({ 
            message: "Sección Guardada",
            ...JSON.parse(JSON.stringify(Saved))
        })

    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}