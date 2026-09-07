import { Request, Response, NextFunction } from "express";
import passport from "./passport.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { AuthRequest } from "./auth.middleware";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserModel.findById(req.userId).select("name email avatar");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = (req: Request, res: Response) => {
  const token = jwt.sign(
    {
      userId: (req.user as any)._id,
      name: (req.user as any).name,
      email: (req.user as any).email,
      avatar: (req.user as any).avatar,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  res.redirect(
    `${FRONTEND_URL}/auth/callback?token=${encodeURIComponent(token)}`,
  );
};

export const facebookAuth = passport.authenticate("facebook", {
  scope: ["email"],
});

export const facebookCallback = (req: Request, res: Response) => {
  const token = jwt.sign(
    {
      userId: (req.user as any)._id,
      name: (req.user as any).name,
      email: (req.user as any).email,
      avatar: (req.user as any).avatar,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  res.redirect(
    `${FRONTEND_URL}/auth/callback?token=${encodeURIComponent(token)}`,
  );
};
