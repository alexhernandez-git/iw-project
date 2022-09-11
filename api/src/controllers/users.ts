import { Request, Response, NextFunction } from "express";
import { UserRoles, User as UserType } from "../types";
import { IUser, User } from "../models/user";
import bcrypt from "bcrypt";
import { getToken } from "../utils/tokens";

const { ACCESS_TOKEN_SECRET = "1234", ACCESS_TOKEN_EXPIRES_IN = "365d" } =
  process.env;

const BCRYPT_SALT_ROUNDS = 12;

export const create = async (
  req: Request<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: UserRoles;
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role = UserRoles.User,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const user = await User.create({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });
    const accessToken = getToken(user._id);

    res.send({ user, accessToken, success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const login = async (
  req: Request<{
    email: string;
    password: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const { password: userRealPassword, _id, role } = user;
    const passValidation =
      password && (await bcrypt.compareSync(password, userRealPassword));
    if (passValidation) {
      const accessToken = getToken(_id);
      res.send({ user, accessToken, success: true });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};
