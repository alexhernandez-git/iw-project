import { Request, Response, NextFunction, Send } from "express";
import { UserRoles, User as UserType, ExpedientState } from "../types";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Expedient } from "../models/expedient";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "1234";

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

    const usersWithThisEmail = await User.exists({ email });

    if (usersWithThisEmail) {
      next({
        statusCode: 404,
        message: "There are users with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const user = await User.create({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });

    res.send({ user, success: true });
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

    let user = await User.findOne({ email });

    const { password: userRealPassword, _id, role } = user;

    const passValidation =
      password && (await bcrypt.compareSync(password, userRealPassword));

    if (passValidation) {
      const accessToken = jwt.sign({ _id, email, role }, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      });

      const expedientesCount = await Expedient.find({
        user: _id,
      }).count();

      const expedientesEnProgresoCount = await Expedient.find({
        user: _id,
        estado: {
          $in: [
            ExpedientState.DocumentacionCompleta,
            ExpedientState.DocumentacionPendiente,
            ExpedientState.ExpedientCursadoNoConcluido,
          ],
        },
      }).count();

      const expedientesFinalizadosCount = await Expedient.find({
        user: _id,
        estado: {
          $in: [
            ExpedientState.Concluido,
            ExpedientState.NoResolucion,
            ExpedientState.ResolucionDeNegatoria,
            ExpedientState.ResolucionFaborable,
          ],
        },
      }).count();

      res.send({
        user,
        accessToken,
        expedientesCount,
        expedientesEnProgresoCount,
        expedientesFinalizadosCount,
        success: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const getByToken = async (
  req: Request<{
    token: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;

    let _id = null;

    jwt.verify(token, accessTokenSecret, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      _id = user._id;
    });

    let user = await User.findById(_id);

    const expedientesCount = await Expedient.find({
      user: _id,
    }).count();

    const expedientesEnProgresoCount = await Expedient.find({
      user: _id,
      estado: {
        $in: [
          ExpedientState.DocumentacionCompleta,
          ExpedientState.DocumentacionPendiente,
          ExpedientState.ExpedientCursadoNoConcluido,
        ],
      },
    }).count();

    const expedientesFinalizadosCount = await Expedient.find({
      user: _id,
      estado: {
        $in: [
          ExpedientState.Concluido,
          ExpedientState.NoResolucion,
          ExpedientState.ResolucionDeNegatoria,
          ExpedientState.ResolucionFaborable,
        ],
      },
    }).count();

    res.send({
      user,
      expedientesCount,
      expedientesEnProgresoCount,
      expedientesFinalizadosCount,
      success: true,
    });
  } catch (error) {
    console.log("error", error.message);
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const updateOne = async (
  req: Request<{
    expedientsTableFields: string[];
    firstName: string;
    lastName: string;
    id: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const template = {
      firstName: null,
      lastName: null,
      expedientsTableFields: null,
    };

    const query = {};

    for (let k in template) {
      query[k] = body[k];
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: query,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.send({ user, success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});

    res.send({ users, success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const deleteOne = async (
  req: Request<{
    id: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;

    await User.deleteOne({ _id: id });

    res.send({ success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const resetPassword = async (
  req: Request<{
    id: string;
    password: string;
    newPassword: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, newPassword } = req.body;

    const { id } = req.params;

    let user = await User.findById(id);

    const { password: userRealPassword } = user;

    const passValidation =
      password && (await bcrypt.compareSync(password, userRealPassword));

    if (passValidation) {
      const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);
      user.password = hashedPassword;
      user.save();
      res.send({ success: true });
    }
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};
