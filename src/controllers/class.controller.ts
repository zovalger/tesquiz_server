import { Request, Response } from "express";

import Admin, { IAdmin } from "../models/admin.model";

import Section  from "../models/section.model";

import Class, {IClass} from "../models/class.model";

export const createClass = async (req: Request, res: Response):Promise<void> => {
  const {title, content, section_id} = req.body;

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
          res.status(401).json({ message: "No tienes permisos para crear una clase" });
          return;
        }

        const section = await Section.findOne({order: section_id});

        const existClass = await Class.find({section_id: section}).sort({ order: -1 });

        const orderClass = existClass.length > 0 ? existClass[0].order + 1 : 1;

      const newClass: IClass = new Class({
          title,
          order: orderClass,
          content,
          section_id: section 
      })

      const Saved: IClass = await newClass.save();

      res.json({ 
          message: "Clase Guardada",
          ...JSON.parse(JSON.stringify(Saved))
      })

  } catch (error: any) {
      res.status(500).json({ message: error.message })
  }
}