import { User as UserType, UserRoles } from "../types";
import { Schema, model } from "mongoose";

const userSchema = new Schema<UserType>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: UserRoles },
});

const reducedUserModel = ["_id", "firstName", "lastName"];

userSchema.set("timestamps", true);

module.exports = {
  User: model<UserType>("User", userSchema),
  reducedUserModel,
};
