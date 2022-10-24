import { Request, Response, NextFunction } from "express";
import { ExpedientType } from "../models/expedient-type";
import { ExpedientResource, ExpedientResourceType } from "../types";

export const create = async (
  req: Request<{
    nombre: string;
    codigo: string;
    tramitePadre: string | null;
    descripcion: string;
    honorarios: number;
    recursos: {
      nombre: string;
      tipo: ExpedientResourceType;
      texto: string;
      descripcion: string;
      custom?: boolean = false;
    }[];
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { nombre, codigo, tramitePadre, descripcion, honorarios, recursos },
    } = req;

    const expedientType = await ExpedientType.create({
      nombre,
      codigo,
      tramitePadre,
      descripcion,
      honorarios,
      recursos,
    });

    res.send({ expedientType, success: true });
  } catch (error) {
    console.log(error);
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

    const expedientType = await ExpedientType.findById(id);

    if (!expedientType) {
      return res.send({
        statusCode: 404,
        message: "Expediente no encontrado",
      });
    }

    res.send({ expedientType, success: true });
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
  const { page = 1, limit = 10 } = req.params;
  try {
    const expedientTypes = await ExpedientType.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    res.send({ expedientTypes, success: true });
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
    tramitePadre: string | null;
    descripcion: string;
    honorarios: number;
    recursos: {
      nombre: string;
      tipo: ExpedientResourceType;
      texto: string;
      descripcion: string;
      custom?: boolean = false;
    }[];
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { nombre, codigo, tramitePadre, descripcion, honorarios, recursos },
      params: { id },
    } = req;

    const expedientType = await ExpedientType.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          nombre,
          codigo,
          tramitePadre,
          descripcion,
          honorarios,
          recursos,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.send({
      expedientType,
      statusCode: 201,
      message: "Expediente actualizado",
    });
  } catch (error) {
    console.log(error);
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

    await ExpedientType.deleteOne({ _id: id });

    res.send({ success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};
