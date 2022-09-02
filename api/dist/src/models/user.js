"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    birthDate: { type: String },
    callingCode: { type: String },
    phoneNumber: { type: String, unique: true, required: true },
    isActive: { type: Boolean, default: false, required: false },
    address: { type: String, default: null },
    city: { type: String, default: null },
    country: { type: String, default: null },
    postalCode: { type: String, default: null },
    publicAddress: { type: String, default: null },
    kyc: [{ type: Schema.Types.ObjectId, ref: "KYC" }],
    criptan: { type: Schema.Types.ObjectId, ref: "Criptan" },
});
const reducedUserModel = ["_id", "firstName", "lastName"];
userSchema.set("timestamps", true);
module.exports = {
    User: mongoose.model("User", userSchema),
    reducedUserModel,
};
