import { Router } from "express";
import passport from "./passport.js";
import {
  googleAuth,
  googleCallback,
  facebookAuth,
  facebookCallback,
  getCurrentUser,
} from "./auth.controller.js";
import { authenticate } from "./auth.middleware.js";

const router = Router();

router.get("/me", authenticate, getCurrentUser);

router.get("/google", googleAuth);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleCallback,
);

router.get("/facebook", facebookAuth);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
  }),
  facebookCallback,
);

export default router;
