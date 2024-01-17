import { Request, Response } from "express";
import Student, { IStudent } from "../models/student.model";
import { createAccessToken } from "../libs/jwt";
import bcryptjs from "bcryptjs";

export const registerStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { firstName, lastName, email, password, username } = req.body;

  try {
    const existUser: IStudent | null = await Student.findOne({ email });
    if (existUser) {
      res.status(400).json(["El correo registrado ya existe"]);
      return;
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newStudent: IStudent = new Student({
      firstName,
      lastName,
      username,
      email,
      password: passwordHash,
    });

    const userSaved: IStudent = await newStudent.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);

    res.json({
      message: "Se ha creado el usuario, correctamente",
      id: userSaved._id,
      firstName: userSaved.firstName,
      lastName: userSaved.lastName,
      username: userSaved.username,
      email: userSaved.email,
      password: userSaved.password,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const LoginStudent = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const studentFound: IStudent | null = await Student.findOne({ email });
    if (!studentFound) {
      res.status(400).json(["El correo no existe"]);
      return;
    }

    const isMatch = await bcryptjs.compare(password, studentFound.password);

    if (!isMatch) {
      res.status(400).json(["Contraseña incorrecta"]);
      return;
    }

    const token = await createAccessToken({ id: studentFound._id });

    res.cookie("token", token)

    res.json({
      message: "Se ha realizado el Login, correctamente",
      id: studentFound._id,
      firstName: studentFound.firstName,
      lastName: studentFound.lastName,
      username: studentFound.username,
      email: studentFound.email,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
