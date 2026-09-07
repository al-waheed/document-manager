import { Request, Response, NextFunction } from "express";
import { documentSchema } from "../validators/document.validator.js";

export const validateDocument = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // A PATCH request is allowed to update the file without
  // providing a new name.
  if (req.body.name === undefined) {
    return next();
  }

  const result = documentSchema.safeParse({
    name: req.body.name,
  });

  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues[0]?.message || "Invalid document name",
    });
  }

  next();
};
