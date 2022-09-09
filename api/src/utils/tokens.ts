import bcrypt from "bcrypt";
import Token from "../models/token";
import { Token as TokenType } from "../types";
import * as crypto from "crypto";

const BCRYPT_SALT_ROUNDS = 12;

const checkToken = async (userId, token) =>
  Token.findOne({ userId }).then(async (doc) => {
    if (!doc) throw new Error("Token is expired");
    if (!(await bcrypt.compare(token, doc.token)))
      throw new Error("Token is not valid");
    return doc;
  });

const getToken = async (userId: string) =>
  Token.findOne({ userId }).then(async (token) => {
    if (token) token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    return bcrypt.hash(resetToken, BCRYPT_SALT_ROUNDS).then((hash) =>
      Token.create({
        userId,
        token: hash,
      }).then(() => resetToken)
    );
  });

export { checkToken, getToken };
