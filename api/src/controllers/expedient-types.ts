import { Request, Response, NextFunction } from "express";
import { ExpedientType } from "../models/expedient-type";
import { ExpedientResourceType } from "../types";

export const create = async (
  req: Request<{
    nombre: string;
    codigo: string;
    tramitePadre: string | null;
    descripcion: string;
    honorarios: number;
    secciones: {
      nombre: string;
      recursos: {
        nombre: string;
        tipo: ExpedientResourceType;
        texto: string;
        descripcion: string;
        custom?: boolean = false;
      }[];
    }[];
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: {
        nombre,
        codigo,
        tramitePadre,
        descripcion,
        honorarios,
        secciones,
      },
    } = req;

    const expedientType = await ExpedientType.create(
      tramitePadre
        ? {
            nombre,
            codigo,
            tramitePadre,
            descripcion,
            honorarios,
            secciones,
          }
        : {
            nombre,
            codigo,
            descripcion,
            honorarios,
            secciones,
          }
    );

    if (expedientType.tramitePadre) {
      const parentExpedient = await ExpedientType.findById(
        expedientType.tramitePadre
      ).select({ nombre: 1, _id: 1, codigo: 1 });
      expedientType.tramitePadre = parentExpedient;
    }

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

    if (expedientType.tramitePadre) {
      const parentExpedient = await ExpedientType.findById(
        expedientType.tramitePadre
      ).select({ nombre: 1, _id: 1, codigo: 1 });
      expedientType.tramitePadre = parentExpedient;
    }

    res.send({
      expedientType,
      success: true,
    });
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
  const { page = 1, limit = null } = req.params;
  try {
    // const expedientTypes = await ExpedientType.find()
    //   .limit(limit * 1)
    //   .skip((page - 1) * limit)
    //   .exec();

    let expedientTypes = [];

    if (!limit) {
      expedientTypes = await ExpedientType.find().select({
        nombre: 1,
        _id: 1,
        codigo: 1,
        tramitePadre: 1,
        secciones: 1,
      });
    } else {
      expedientTypes = await ExpedientType.find();
    }

    res.send({
      count: expedientTypes.length,
      page: 0,
      size: expedientTypes.length,
      data: expedientTypes,
      success: true,
    });
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
    secciones: {
      nombre: string;
      recursos: {
        nombre: string;
        tipo: ExpedientResourceType;
        texto: string;
        descripcion: string;
        custom?: boolean = false;
      }[];
    }[];
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: {
        nombre,
        codigo,
        tramitePadre,
        descripcion,
        honorarios,
        secciones,
      },
      params: { id },
    } = req;

    const expedientType = await ExpedientType.findOneAndUpdate(
      { _id: id },
      {
        $set: tramitePadre
          ? {
              nombre,
              codigo,
              tramitePadre,
              descripcion,
              honorarios,
              secciones,
            }
          : {
              nombre,
              codigo,
              descripcion,
              honorarios,
              secciones,
            },
      },
      {
        upsert: true,
        new: true,
      }
    );

    if (expedientType.tramitePadre) {
      const parentExpedient = await ExpedientType.findById(
        expedientType.tramitePadre
      ).select({ nombre: 1, _id: 1, codigo: 1 });
      expedientType.tramitePadre = parentExpedient;
    }

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
