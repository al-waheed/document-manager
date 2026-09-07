import { Router } from "express";
import passport from "./passport.js";
import {
  googleAuth,
  googleCallback,
  facebookAuth,
  facebookCallback,
} from "./auth.controller.js";

const router = Router();

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
