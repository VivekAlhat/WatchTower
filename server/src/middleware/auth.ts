import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};
