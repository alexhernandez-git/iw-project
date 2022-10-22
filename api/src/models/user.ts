import { Schema, model, Document } from "mongoose";
import { Token, UserRoles } from "../types";

// 1. Create an interface representing a document in MongoDB.
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoles;
  token: Token;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: UserRoles },
  token: {
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
  },
});

// 3. Create a Model.
const User = model<IUser>("User", userSchema);
export { User };
