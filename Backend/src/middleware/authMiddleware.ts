import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string; // Use string if UUID
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  console.log({ authHeader: authHeader });

  const token = authHeader && authHeader.split(" ")[1];
  console.log({ token: token });

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    console.log({ decoded: decoded });

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Invalid token." });
  }
};
