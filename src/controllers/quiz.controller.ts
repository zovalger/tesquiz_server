import { Request, Response } from "express";



import Admin, { IAdmin } from "../models/admin.model";
import Quiz, { IQuiz } from "../models/quiz.model";
import Class from "../models/class.model";

export const createQuiz = async (req: Request, res: Response) => {
   const {text, correct, incorrect, time, class_id} = req.body;
   
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

          const classFind = await Class.findOne({ _id: class_id  });


          const newQuiz: IQuiz = new Quiz({
            text, 
            correct, 
            incorrect, 
            time, 
            class_id: classFind 
        })

        const Saved: IQuiz = await newQuiz.save()

        res.json({ 
            message: "Quiz Guardado",
            ...JSON.parse(JSON.stringify(Saved))
        })

    } catch (error: any) {
        res.status(500).json({ message: error.message})
    }
}