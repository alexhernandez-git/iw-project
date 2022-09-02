"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
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
module.exports = mongoose.model("Token", tokenSchema);
