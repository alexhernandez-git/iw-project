import { Request, Response, NextFunction } from "express";
import { ExpedientType } from "../models/expedient-type";
import { ExpedientResource } from "../types";

export const create = async (
  req: Request<{
    nombre: string;
    codigo: string;
    tramitePadre: string;
    descripcion: string;
    honorarios: number;
    recursos: ExpedientResource[];
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { nombre, codigo, tramitePadre, descripcion, honorarios, recursos },
    } = req;

    const expedient = await ExpedientType.create({
      nombre,
      codigo,
      tramitePadre,
      descripcion,
      honorarios,
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

    const expedient = await ExpedientType.findById(id);

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
    const expedient = await ExpedientType.find()
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
    nombre: string;
    codigo: string;
    tramitePadre: string;
    descripcion: string;
    honorarios: number;
    recursos: ExpedientResource[];
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { nombre, codigo, tramitePadre, descripcion, honorarios, recursos },
      params: { id },
    } = req;

    const expedientType = await ExpedientType.updateOne(
      { _id: id },
      {
        nombre,
        codigo,
        tramitePadre,
        descripcion,
        honorarios,
        recursos,
      }
    );

    res.send({ expedientType, success: true });
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

    const expedient = await ExpedientType.deleteOne({ _id: id });

    res.send({ expedient, success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};
