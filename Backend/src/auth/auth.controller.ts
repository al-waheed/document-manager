import { Request, Response } from "express";
import passport from "./passport.js";
import jwt from "jsonwebtoken";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = (req: Request, res: Response) => {
  const token = jwt.sign(
    {
      userId: (req.user as any)._id,
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
