import { Router } from "express";
import {
  getDocuments,
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/document.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { validateDocument } from "../middleware/validate.middleware.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

// Get all documents belonging to the authenticated user.
router.get("/", authenticate, getDocuments);

// Upload a new document.
router.post("/", authenticate, upload.single("file"), createDocument);

// Get one document belonging to the authenticated user.
router.get("/:id", authenticate, getDocument);

// Update document name and/or replace file.
router.patch(
  "/:id",
  authenticate,
  upload.single("file"),
  validateDocument,
  updateDocument,
);

// Delete document.
router.delete("/:id", authenticate, deleteDocument);

export default router;
