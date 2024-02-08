import { Request, Response } from "express";

import Section, { ISection } from "../models/section.model";
import Class from "../models/class.model";

import { createElement } from "../services/logbookService";

export const createSection = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title } = req.body;

  try {
    const allSection = await Section.find().sort({ order: -1 });

    const orderSection = allSection.length > 0 ? allSection[0].order + 1 : 1;

    const newSection: ISection = new Section({
      title,
      order: orderSection,
    });

    const Saved: ISection = await newSection.save();

    const userId = req.user.id;

    const filterData = {
      id: Saved.id,
      title: Saved.title,
      order: Saved.order,
    };

    await createElement("createSection", "create", userId, filterData);
    res.json({
      message: "Sección Guardada",
      data: {
        ...JSON.parse(JSON.stringify(Saved))
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

export const sections = async (_req: Request, res: Response) => {
  try {
    const sections = await Section.find();
    res.status(200).json(sections);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const section = async (req: Request, res: Response) => {
  try {
    const section = await Section.findById(req.params.id);

    if (!section) {
      res.status(400).json({ message: "no se encontro la sección" });
      return;
    }

    res.status(200).json(section);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  try {
    const section = await Section.findById(req.params.id);
    const classes = await Class.find({ section_id: section?.id });

    if (!section) {
      res.status(400).json({ message: "no se encontro la sección" });
      return;
    }

    console.log(classes)
    if (classes.length >= 1) {
      res
        .status(400)
        .json({ message: "No se puede eliminar la sección si posee clases" });
      return;
    }

    const deletedOrder = section.order;

    await Section.updateMany(
      { order: { $gt: deletedOrder } },
      { $inc: { order: -1 } }
    );

    await Section.deleteOne({ _id: section._id });

    res.status(200).json({
      message: "Sección eliminada correctamente",
      ...JSON.parse(JSON.stringify(section)),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const updateSection = async (req: Request, res: Response) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!section) {
      res.status(400).json({ message: "No se encontro la sección" });
      return;
    }

    const userId = req.user.id;

    const filterData = {
      id: section.id,
      title: req.body.title,
      order: section.order,
    };

    await createElement("UpdateSection", "update", userId, filterData);
    res.json({
      message: "Se actualizo correctamente la sección",
      data:{
        ...JSON.parse(JSON.stringify(section))
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
