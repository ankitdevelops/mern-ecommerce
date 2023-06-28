import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  phoneNumbers: [
    {
      type: String,
      required: true,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("UserAddress", addressSchema);
