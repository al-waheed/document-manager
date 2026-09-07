import mongoose from "mongoose";

//schema describe what the document should look like in the database, it is a blueprint for the document
const documentationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//The model is a class that we can use to interact with the database.
export const DocumentModel = mongoose.model("Document", documentationSchema);
