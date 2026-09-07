import { Request, Response, NextFunction } from "express";
import { DocumentModel } from "../models/document.model";
import cloudinary from "../config/cloudinary.js";
import { AppError } from "../utils/AppError.js";
import { AuthRequest } from "../auth/auth.middleware";

const getCloudinaryResourceType = (mimeType: string): "image" | "raw" => {
  // Cloudinary can serve PDFs as image resources, which allows
  // browsers to render them instead of forcing a download.
  if (mimeType.startsWith("image/") || mimeType === "application/pdf") {
    return "image";
  }

  return "raw";
};

const uploadToCloudinary = async (file: Express.Multer.File) => {
  const resourceType = getCloudinaryResourceType(file.mimetype);

  return new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "document-manager",
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      },
    );

    uploadStream.end(file.buffer);
  });
};

const deleteFromCloudinary = async (publicId: string, mimeType: string) => {
  if (!publicId) {
    return;
  }

  const resourceType = getCloudinaryResourceType(mimeType);

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    console.log("Cloudinary delete result:", result);
  } catch (error) {
    console.error("Cloudinary delete error:", error);

    // Do not prevent MongoDB deletion just because Cloudinary
    // could not delete an already-missing asset.
  }
};

export const getDocuments = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const documents = await DocumentModel.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(documents);
  } catch (error) {
    next(error);
  }
};

export const getDocument = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const document = await DocumentModel.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!document) {
      throw new AppError("Document not found", 404);
    }

    res.status(200).json(document);
  } catch (error) {
    next(error);
  }
};

export const createDocument = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File is required",
      });
    }

    const file = req.file;

    const uploadResult = await uploadToCloudinary(file);

    try {
      const document = await DocumentModel.create({
        userId: req.userId,
        name: file.originalname,
        fileUrl: uploadResult.secure_url,
        fileType: file.mimetype,
        fileSize: file.size,
        cloudinaryPublicId: uploadResult.public_id,
      });

      res.status(201).json(document);
    } catch (databaseError) {
      // If MongoDB creation fails after Cloudinary upload,
      // remove the orphaned Cloudinary asset.
      await deleteFromCloudinary(uploadResult.public_id, file.mimetype);

      throw databaseError;
    }
  } catch (error) {
    next(error);
  }
};

export const updateDocument = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const document = await DocumentModel.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!document) {
      throw new AppError("Document not found", 404);
    }

    // Replace the existing file if a new file was uploaded.
    if (req.file) {
      const file = req.file;

      const oldPublicId = document.cloudinaryPublicId;
      const oldFileType = document.fileType;

      const uploadResult = await uploadToCloudinary(file);

      try {
        document.name = file.originalname;
        document.fileUrl = uploadResult.secure_url;
        document.fileType = file.mimetype;
        document.fileSize = file.size;
        document.cloudinaryPublicId = uploadResult.public_id;

        await document.save();
      } catch (databaseError) {
        // Remove newly uploaded file if MongoDB update fails.
        await deleteFromCloudinary(uploadResult.public_id, file.mimetype);

        throw databaseError;
      }

      // Delete old Cloudinary file only after the new file
      // and MongoDB update succeeded.
      await deleteFromCloudinary(oldPublicId, oldFileType);
    }

    // Update only the document name when supplied.
    if (req.body.name !== undefined) {
      const name = String(req.body.name).trim();

      if (!name) {
        throw new AppError("Document name is required", 400);
      }

      if (name.length > 100) {
        throw new AppError("Document name must not exceed 100 characters", 400);
      }

      document.name = name;

      await document.save();
    }

    res.status(200).json(document);
  } catch (error) {
    next(error);
  }
};

export const deleteDocument = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const document = await DocumentModel.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!document) {
      throw new AppError("Document not found", 404);
    }

    // Delete Cloudinary asset first.
    await deleteFromCloudinary(document.cloudinaryPublicId, document.fileType);

    // Then delete the database record.
    await DocumentModel.deleteOne({
      _id: document._id,
      userId: req.userId,
    });

    res.status(200).json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
