import { Request, Response, NextFunction } from "express";

export const validateDocument = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message: "Document name is required and must be a string",
    });
  }

  next();
};
