import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { Expedient } from "../models/expedient";
import { ExpedientType } from "../models/expedient-type";
import {
  ExpedientResourceType,
  ExpedientState,
  HonorariosYSuplidosType,
} from "../types";
import moment from "moment";
import fs from "fs";

const BASE_PATH = "./uploads";

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

    let areaFuncional = null;

    if (expedientType.isAreaFuncional) {
      areaFuncional = expedientType._id;
    }

    const getAreaFuncional = async (id) => {
      const expedientTypeWithParents = await ExpedientType.findById(
        id
      ).populate("tramitePadre");
      if (expedientTypeWithParents.isAreaFuncional) {
        return expedientTypeWithParents;
      }
      if (!expedientTypeWithParents.tramitePadre) {
        return null;
      }
      return await getAreaFuncional(
        expedientTypeWithParents?.tramitePadre?._id
      );
    };

    areaFuncional = await getAreaFuncional(tipo);

    const expedient = await Expedient.create({
      tipo: new Types.ObjectId(tipo),
      areaFuncional,
      vinculado: vinculado,
      secciones: expedientType?.secciones ?? [],
      user: _id,
    });

    res.send({ expedient, success: true });
  } catch (error) {
    console.log(error.message);
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
    }).populate(["tipo", "vinculado", "areaFuncional"]);

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

  try {
    const expedients = await Expedient.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate(["tipo", "vinculado", "areaFuncional"])
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
      files,
      body,
      params: { id },
    } = req;

    const { data } = body;

    let dataJSON = JSON.parse(data);

    if (files) {
      var fileKeys = Object.keys(files);
      fileKeys.forEach(function (key) {
        let path = "";
        const [section, fieldName] = key.split("/");
        console.log({ section, fieldName });
        const file = files[key];
        const itemNames = [];
        if (Array.isArray(file)) {
          file.forEach((fileItem) => {
            const fileName = `${moment().format("YYYY-MM-DD HH:mm:ss")}]-[${
              fileItem.name
            }`;
            path = `${BASE_PATH}/${fileName}`;
            fileItem.mv(path);
            itemNames.push(fileName);
          });
        } else {
          const fileName = `${moment().format("YYYY-MM-DD HH:mm:ss")}]-[${
            file.name
          }`;
          path = `${BASE_PATH}/${fileName}`;
          file.mv(path);
          itemNames.push(fileName);
        }
        const filesToDelete = [];
        dataJSON.secciones = dataJSON.secciones.map((sectionItem) =>
          sectionItem.nombre === section
            ? {
                ...sectionItem,
                recursos: sectionItem.recursos.map((resource) => {
                  if (resource.nombre === fieldName) {
                    filesToDelete.push([
                      ...filesToDelete,
                      ...resource.archivos,
                    ]);
                    return {
                      ...resource,
                      archivos: itemNames,
                    };
                  } else {
                    return resource;
                  }
                }),
              }
            : sectionItem
        );
        filesToDelete.forEach((file) => {
          fs.unlink(BASE_PATH + "/" + file, (err) => {
            if (err) {
              console.log("file error", err);
            }
          });
        });
      });
    }

    const expedient = await Expedient.findOneAndUpdate(
      { _id: id, user: req.user._id },
      {
        $set: dataJSON,
      },
      {
        upsert: true,
        new: true,
      }
    ).populate(["tipo", "vinculado"]);

    res.send({ expedient, success: true });
  } catch (error) {
    console.log(error.message);
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
