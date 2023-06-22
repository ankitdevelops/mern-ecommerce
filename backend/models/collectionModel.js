import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "Please provide a product name"],
      trim: true,
      maxLength: [
        120,
        "Collection Name should not be more than 120 characters",
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);
