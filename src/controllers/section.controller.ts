import { Request, Response } from "express";

import Section, {ISection} from "../models/section.model";

import { createElement } from "../services/logbookService";



export const createSection =async (req: Request, res: Response):Promise<void> => {
    const {title} = req.body;

    try {


        const allSection = await Section.find().sort({ order: -1 });


          const orderSection =  (allSection.length > 0) ? allSection[0].order + 1 : 1

        const newSection: ISection = new Section({
            title,
            order: orderSection
        })

        const userId = req.user.id;
        await createElement("createSection", "create", userId);


        const Saved: ISection = await newSection.save();

      
        res.json({ 
            message: "Sección Guardada",
            ...JSON.parse(JSON.stringify(Saved))
        })

    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const sections = async (_req: Request, res: Response) => {
    try {
        const sections = await Section.find();
        res.status(200).json(sections) 
    } catch (error:any) {
        res.status(500).json({ message: error.message})
    }
}

export const section = async (req: Request, res: Response) => {
    try {
        const section = await Section.findById(req.params.id)

        if(!section){
            res.status(400).json({ message: "no se encontro la sección" })
            return
        }

        res.status(200).json(section) 
        
    } catch (error:any) {
        res.status(500).json({ message: error.message})
    }
}

export const deleteSection = async (req: Request, res: Response) => {
    try {

        const section = await Section.findById(req.params.id)

        if(!section){
            res.status(400).json({ message: "no se encontro la sección" })
            return
        }
        const deletedOrder = section.order;

      
        await Section.updateMany(
            { order: { $gt: deletedOrder } },
            { $inc: { order: -1 } }
          );

         await Section.deleteOne({ _id: section._id });

        res.status(200).json({ message: "Sección eliminada correctamente"}) 
        
    } catch (error:any) {
        res.status(500).json({ message: error.message})
    }
}