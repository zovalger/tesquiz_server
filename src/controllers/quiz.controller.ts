import { Request, Response } from "express";

import Quiz, { IQuiz } from "../models/quiz.model";
import Class from "../models/class.model";

// import { createElement } from "../services/logbookService";



export const createQuiz = async (req: Request, res: Response) => {
   const {text, correct, incorrect, time, class_id} = req.body;
   
    try {


          const classFind = await Class.findOne({ _id: class_id  });


          const newQuiz: IQuiz = new Quiz({
            text, 
            correct, 
            incorrect, 
            time, 
            class_id: classFind 
        })

          
    //   const userId = req.user.id;
    //   await createElement("createQuiz", "create", userId);


        const Saved: IQuiz = await newQuiz.save()

        res.json({ 
            message: "Quiz Guardado",
            ...JSON.parse(JSON.stringify(Saved))
        })

    } catch (error: any) {
        res.status(500).json({ message: error.message})
    }
}

export const quizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await Quiz.findOne({class_id: req.params.id});
        res.status(200).json(quizzes);
    } catch (error:any) {
        res.status(500).json({ message: error.message })
    }
}