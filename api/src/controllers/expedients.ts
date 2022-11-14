import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { Expedient } from "../models/expedient";
import { ExpedientType } from "../models/expedient-type";
import {
  ExpedientResourceType,
  ExpedientState,
  HonorariosYSuplidosType,
} from "../types";

export const create = async (
  req: Request<{
    tipo: string;
    vinculado: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      user: { _id },
      body: { tipo, vinculado },
    } = req;

    const expedientType = await ExpedientType.findById(tipo);

    const expedient = await Expedient.create({
      tipo: new Types.ObjectId(tipo),
      vinculado: vinculado,
      secciones: expedientType?.secciones ?? [],
      user: _id,
    });

    res.send({ expedient, success: true });
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

    const expedient = await Expedient.findOne({
      _id: id,
      user: req.user._id,
    }).populate(["tipo", "vinculado"]);

    console.log({ expedient });
    if (!expedient) {
      return res.send({
        statusCode: 404,
        message: "Expediente no encontrado",
      });
    }

    res.send({ expedient, success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error buscando expediente",
    });
  }
};

export const find = async (
  req: Request<{
    search: string;
    page: number;
    limit: number;
  }>,
  res: Response,
  next: NextFunction
) => {
  let { page = 1, limit = 10 } = req.query;

  console.log({ page, limit });

  try {
    const expedients = await Expedient.find({
      user: req.user._id,
    })
      .populate(["tipo", "vinculado"])
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    res.send({
      count: await Expedient.find({ user: req.user._id }).count(),
      page: Number(page),
      size: expedients.length,
      data: expedients,
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
    estado: ExpedientState;
    tipo: string;
    vinculado: string;
    guardadoEn: string;
    fechaSolicitudServicioNotificacion: string;
    asunto: string;
    honorariosYSuplidos: {
      tipo: { enum: HonorariosYSuplidosType; type: String };
      cantidad: { type: Number };
    }[];
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
      body,
      params: { id },
    } = req;

    const expedient = await Expedient.findOneAndUpdate(
      { _id: id, user: req.user._id },
      {
        $set: body,
      },
      {
        upsert: true,
        new: true,
      }
    ).populate(["tipo", "vinculado"]);

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

    await Expedient.deleteOne({ _id: id });

    res.send({ success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};
