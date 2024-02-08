import mongoose from "mongoose";
import Logbook, {Ilogbook}from "../models/logbook.model";

export const createElement = async (
    place: string,
    type: string,
    by: mongoose.ObjectId,
    object: object
  ): Promise<Ilogbook> => {


    const newLog: Ilogbook = new Logbook({
        place,
        type,
        by,
        object
    });
  
    const LogbookSaved: Ilogbook = await newLog.save();
  
    return LogbookSaved;
  };
