import mongoose, { Document, Schema, model} from "mongoose";
import Class from "./class.model";
import Student from "./student.model";

export interface IReportClass extends Document {
    message: string;
    class_id: mongoose.Schema.Types.ObjectId;
    sender: mongoose.Schema.Types.ObjectId
};

const reportClassSchema = new Schema<IReportClass> (
    {
        message: {type: String, required: true},
        class_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Class
        },
        sender: {
         type: mongoose.Schema.Types.ObjectId,
         ref: Student
        }
    },
    { timestamps: true }
)

const ReportClass = model<IReportClass>("ReportClass", reportClassSchema)

export default ReportClass