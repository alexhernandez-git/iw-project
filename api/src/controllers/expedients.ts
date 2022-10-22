import { Request, Response, NextFunction } from "express";
import { Expedient } from "../models/expedient";
import { ExpedientResource, ExpedientResourceType } from "../types";

export const create = async (
  req: Request<{
    tipo: string;
    vinculado: string;
    asunto: string;
    recursos: ExpedientResource[];
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { tipo, vinculado, asunto, recursos },
    } = req;

    const expedient = await Expedient.create({
      tipo,
      vinculado,
      asunto,
      recursos,
    });

    res.send({ expedient, success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const findOne = async (
  req: Request<{
    id: String;
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const expedient = await Expedient.findById(id);

    res.send({ expedient, success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const find = async (
  req: Request<{
    page: number;
    limit: number;
  }>,
  res: Response,
  next: NextFunction
) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const expedient = await Expedient.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    res.send({ expedient, success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const updateOne = async (
  req: Request<{
    id: string;
    tipo: string;
    vinculado: string;
    asunto: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { tipo, vinculado, asunto },
      params: { id },
    } = req;

    const expedient = await Expedient.updateOne(
      { _id: id },
      {
        tipo,
        vinculado,
        asunto,
      }
    );

    res.send({ expedient, success: true });
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

    const expedient = await Expedient.deleteOne({ _id: id });

    res.send({ expedient, success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};
