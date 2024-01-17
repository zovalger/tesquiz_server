import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt";

import Admin, { IAdmin } from "../models/admin.model";

export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { firstName, lastName, username, email, password, permissions } =
    req.body;

  try {
    const existUser: IAdmin | null = await Admin.findOne({ email });
    if (existUser) {
      res.status(400).json(["El correo registrado ya existe"]);
      return;
    }

    if (permissions.length == 0) {
      res
        .status(400)
        .json(["El array de permisos no debe contener valores vacíos"]);
      return;
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newAdmin: IAdmin = new Admin({
      firstName,
      lastName,
      username,
      email,
      password: passwordHash,
      permissions,
    });

    const userSaved: IAdmin = await newAdmin.save();

    const token = await createAccessToken({ id: userSaved._id })

    res.cookie("token", token)
    res.json({
      message: "Se ha creado el usuario, correctamente",
      id: userSaved._id,
      firstName: userSaved.firstName,
      lastName: userSaved.lastName,
      username: userSaved.username,
      email: userSaved.email,
      password: userSaved.password,
      permissions: userSaved.permissions,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userFound: IAdmin | null = await Admin.findOne({ email });

    if (!userFound) {
      res.status(400).json(["El correo no se encuentra registrado"]);
      return;
    }

    const isMatch = await bcryptjs.compare(password, userFound.password);

    if (!isMatch) {
      res.status(400).json(["Contraseña incorrecta"]);
      return;
    }


    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token)
    res.json({
      message: "Usuario logueado correctamente",
      id: userFound._id,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      username: userFound.username,
      email: userFound.email,
      permissions: userFound.permissions,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


