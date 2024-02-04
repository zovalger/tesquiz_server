import mongoose, { model, Schema, Document } from "mongoose";
import Class from "./class.model";
import Student from "./student.model";

export interface IFished extends Document {
    correct: Array<string>;
    incorrect: Array<string>;
    time: number;
    total: number;
    class_id: mongoose.Schema.Types.ObjectId;
    student_id: mongoose.Schema.Types.ObjectId
};

const classFishedSchema = new Schema<IFished>(
    {
        correct: [
            { type: String }
        ],
        incorrect: [
            { type: String }
        ],
        time: { type: Number, required: true},
        total: { type: Number, required: true},
        class_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Class
        },
        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Student
        }
    },
    { timestamps: true }
);

const ClassFished = model<IFished>("ClassFished", classFishedSchema)

export default ClassFished