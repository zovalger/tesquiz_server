import { Request, Response } from "express";

import Section  from "../models/section.model";

import Class, {IClass} from "../models/class.model";

import { createElement } from "../services/logbookService";

import { AuthCreateClassPermission } from "../services/classService";

export const createClass = async (req: Request, res: Response):Promise<void> => {
  const {title, content, section_id} = req.body;

  try {

       await AuthCreateClassPermission(req, res);

        const section = await Section.findOne({order: section_id});

        const existClass = await Class.find({section_id: section}).sort({ order: -1 });

        const orderClass = existClass.length > 0 ? existClass[0].order + 1 : 1;

      const newClass: IClass = new Class({
          title,
          order: orderClass,
          content,
          section_id: section 
      })


      const userId = req.user.id;
      await createElement("createClass", "create", userId);

      const Saved: IClass = await newClass.save();

      res.json({ 
          message: "Clase Guardada",
          ...JSON.parse(JSON.stringify(Saved))
      })

  } catch (error: any) {
      res.status(500).json({ message: error.message })
  }
}

export const classes =async (req: Request, res: Response) => {
    try {
        const classes = await Class.find({section_id: req.params.id}).sort({order: 1});
        res.status(200).json(classes) 
    } catch (error:any) {
        res.status(500).json({ message: error.message} ) 
    }
}

export const getClass =async (req: Request, res: Response) => {
    try {
        const getclass = await Class.findById(req.params.id)
        res.status(200).json(getclass); 
    } catch (error:any) {
        res.status(500).json({ message: error.message} ) 
    }
}