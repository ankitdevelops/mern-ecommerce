import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "Please provide a product name"],
      trim: true,
      maxLength: [120, "Product Name should not be more than 120 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
      maxLength: [5, "Product price should not be more than 5 digits"],
    },
    description: {
      type: String,
    },
    photos: [
      {
        secure_url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
        },
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      required: true,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
