import { Request, Response } from "express";

import ReportClass, {IReportClass} from "../models/reportClass.model";

export const sendReportClass =async (req: Request, res: Response) => {
    const { message } = req.body;

    try {
        const userId = req.user?.id;
  
        const newReport: IReportClass = new ReportClass({
                message,
                class_id: req.params.id,
                sender: userId
            });

        const Saved: IReportClass = await newReport.save();

        res.json({ 
            message: "Reporte enviado",
            ...JSON.parse(JSON.stringify(Saved))
        })

    } catch (error: any) {
        res.status(500).json({ message: error.message})
    }
}

export const reportClasses =async (_req: Request, res: Response) => {
    try {
        const reportClasses = await ReportClass.find();

        res.status(200).json(reportClasses);
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}