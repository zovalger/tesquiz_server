import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"; // Importa los tipos de Request, Response y NextFunction de Express
import { TOKEN_SECRET } from "../config";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string }; 
    }
  }
}
export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: "No token" });
    return;
  }

  jwt.verify(token, TOKEN_SECRET || "", (err: any, user: any) => {
    if (err) {
      res.status(403).json({ message: `Error: ${err}` });
      return;
    }

    req.user = user;

    next();
  });
};
