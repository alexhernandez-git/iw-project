"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var bcrypt = require("bcrypt");
const Token = require("../models/token");
const BCRYPT_SALT_ROUNDS = 12;
const checkToken = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    return Token.findOne({ userId })
        .then((doc) => __awaiter(void 0, void 0, void 0, function* () {
        if (!doc)
            throw new Error("Token is expired");
        if (!(yield bcrypt.compare(token, doc.token)))
            throw new Error("Token is not valid");
        return doc;
    }));
});
const getToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return Token.findOne({ userId })
        .then((token) => __awaiter(void 0, void 0, void 0, function* () {
        if (token)
            token.deleteOne();
        let resetToken = crypto.randomBytes(32).toString("hex");
        return bcrypt.hash(resetToken, BCRYPT_SALT_ROUNDS)
            .then((hash) => Token.create({
            userId,
            token: hash,
        })
            .then(() => resetToken));
    }));
});
module.exports = { checkToken, getToken };
