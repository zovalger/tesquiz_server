import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

import AdminModel from "../models/admin.model";
import Student from '../models/student.model';

export const logout = async (_req: Request, res: Response ) => {
    try{
      res.cookie("token", "", {
        expires: new Date(0),
      });
      res.sendStatus(200);
      return
    } catch(error: any){
      res.status(500).json({ message: error.message });
    }
  }

  declare module "express" {
    interface Request {
      user?: any; 
    }
  }
  
  export const profile = async (req: Request, res: Response) => {
    try {

      const AdminFound = await AdminModel.findById(req.user.id);

      const StudentFound = await Student.findById(req.user.id) 

      const userFound = AdminFound?.role == "Admin" ? AdminFound : StudentFound?.role == "Student" ? StudentFound : null

      console.log(userFound)

      if(!userFound){
        res.status(400).json( {message: "Usuario no encontrado"})
        return
      }
  
      res.json({
        id: userFound._id,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        username: userFound.username,
        email: userFound.email,
        role: userFound.role
      })
  
      return
  
      res.send("profile");
  
  
    } catch (error: any) {
      res.status(500).json( { message: error.message})
    }
  }
  
  export const verifyToken = async (req: Request, res: Response) => {
    const {token} = req.cookies
  
    if(!token){
      res.status(401).json({ message: "No autorizado"});
      return
    }
  
    jwt.verify(token, TOKEN_SECRET || "", async (err: any, user?: any) => {
  
      if (err) {
        res.status(401).json({message: "No autorizado"});
        return
      }

      const AdminFound = await AdminModel.findById(user.id);
      const StudentFound = await Student.findById(user.id) 

      const userFound = AdminFound?.role == "Admin" ? AdminFound : StudentFound?.role == "Student" ? StudentFound : null
      
      
      console.log(userFound)

      if (!userFound) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }
  
      res.json({
        id: userFound._id,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        username: userFound.username, 
        email: userFound.email,
      });
  
  
    })
  }


