import mongoose, { Document, Schema, model  } from "mongoose";
import ClassModel from "./class.model";

export interface IQuiz extends Document {
    text: string;
    correct: Array<string>;
    incorrect: Array<string>;
    time: number;
    class_id: mongoose.Schema.Types.ObjectId
}

const quizSchema = new Schema<IQuiz>(
    {
        text: { type: String, required: true},
        correct: [
            { type: String }
        ],
        incorrect: [
            { type: String }
        ],
        time: { type: Number, required: true},
        class_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ClassModel
        },
    },
    { timestamps: true }
)

const Quiz = model<IQuiz>("quiz", quizSchema)

export default Quiz