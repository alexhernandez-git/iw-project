import { Schema, model, connect, Document, ObjectId } from "mongoose";
import { UserRoles } from "../types";

// 1. Create an interface representing a document in MongoDB.
export interface IToken extends Document {
  userId: ObjectId;
  token: string;
  createdAt: Date;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IToken>({
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

// 3. Create a Model.
const Token = model<IToken>("Token", userSchema);
export { Token };
