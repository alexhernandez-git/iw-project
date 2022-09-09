import { Schema, model } from "mongoose";
import { Token } from "../types";

const tokenSchema = new Schema<Token>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // expires: 10,// this is the expiry time in seconds
  },
});

tokenSchema.index({ createdAt: 1 }, { expires: 172800 });
// tokenSchema.index({"createdAt": 1});

module.exports = model<Token>("Token", tokenSchema);
