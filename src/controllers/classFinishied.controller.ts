import { Request, Response } from "express";
import ClassFished from "../models/classFinished";

export const createClassFinished = async(req: Request, res: Response) => {
  const { correct, incorrect, time } = req.body;

  try {

    const userId = req.user?.id;

    const totalQuestions = correct.length + incorrect.length;

    const exist = await ClassFished.findOne({ class_id: req.params.id})

    if (exist) {
      res.status(400).json({ message: "Esta clase ya posee un registro de finalización"})
      return
    }

    const newClassFinished = new ClassFished({
      correct,
      incorrect,
      time,
      total: totalQuestions,
      class_id: req.params.id,
      student_id: userId,
    });

    const Saved = await newClassFinished.save();

    res.json({
      ...JSON.parse(JSON.stringify(Saved))
    })

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
