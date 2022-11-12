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
  expedientsTableFields: string[];
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: UserRoles },
  expedientsTableFields: {
    type: [String],
    default: [
      "_id",
      "responsable",
      "cliente",
      "fechaSolicitudServicioNotificacion",
    ],
  },
});

userSchema.set("timestamps", true);
userSchema.index({ createdAt: 1 });
userSchema.index({ updatedAt: 1 });

// 3. Create a Model.
const User = model<IUser>("User", userSchema);
export { User };
