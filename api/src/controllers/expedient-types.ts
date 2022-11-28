import { Request, Response, NextFunction } from "express";
import { ExpedientType } from "../models/expedient-type";
import { ExpedientResourceType } from "../types";
import moment from "moment";
import fs from "fs";
import { getAreaFuncional } from "../utils/helpers";

const BASE_PATH = "./uploads";

export const create = async (
  req: Request<{
    nombre: string;
    codigo: string;
    tramitePadre: string | null;
    descripcion: string;
    honorarios: number;
    isAreaFuncional: boolean;
    secciones: {
      nombre: string;
      recursos: {
        nombre: string;
        tipo: ExpedientResourceType;
        texto: string;
        descripcion: string;
      }[];
    }[];
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, files, body } = req;

    const { data } = body;

    let dataJSON = JSON.parse(data);

    dataJSON.user = user._id;

    if (!dataJSON.tramitePadre) {
      delete dataJSON.tramitePadre;
    }

    if (files) {
      var fileKeys = Object.keys(files);
      fileKeys.forEach(function (key) {
        let path = "";
        const [section, fieldName] = key.split("/");
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
        dataJSON.secciones = dataJSON.secciones.map((sectionItem) =>
          sectionItem.nombre === section
            ? {
                ...sectionItem,
                recursos: sectionItem.recursos.map((resource) => {
                  if (resource.nombre === fieldName) {
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
      });
    }

    const expedientType = await (
      await ExpedientType.create(dataJSON)
    ).populate("tramitePadre");

    expedientType.areaFuncional = await getAreaFuncional(expedientType._id);
    expedientType.save();

    res.send({ expedientType, success: true });
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
    search: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  const { page = 1, limit = null, search } = req.query;
  try {
    let expedientTypes = [];
    if (!limit) {
      expedientTypes = await ExpedientType.find()
        .sort({ createdAt: -1 })
        .select({
          nombre: 1,
          _id: 1,
          codigo: 1,
          tramitePadre: 1,
          secciones: 1,
        });
    } else {
      expedientTypes = await ExpedientType.find(
        search
          ? {
              $or: [
                { nombre: { $regex: search, $options: "i" } },
                { codigo: { $regex: search, $options: "i" } },
                { "tramitePadre.nombre": { $regex: search, $options: "i" } },
                { "tramitePadre.codigo": { $regex: search, $options: "i" } },
                { "areaFuncional.nombre": { $regex: search, $options: "i" } },
                { "areaFuncional.codigo": { $regex: search, $options: "i" } },
              ],
            }
          : {}
      )
        .sort({ createdAt: -1 })
        .limit(Number(limit) * 1)
        .skip((Number(page) - 1) * Number(limit))
        .exec();
    }

    res.send({
      count: await ExpedientType.find({}).count(),
      page: Number(page),
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

export const findFuncionalAreas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expedientTypes = await ExpedientType.find({
      isAreaFuncional: true,
    }).select({
      nombre: 1,
      _id: 1,
    });
    res.send({
      expedientTypes,
      success: true,
    });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const findNames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expedientTypes = await ExpedientType.find({}).select({
      nombre: 1,
      _id: 1,
    });
    res.send({
      expedientTypes,
      success: true,
    });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const findAll = async (
  req: Request<{
    search?: string | null;
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search } = req.query;
    const expedientTypes = await ExpedientType.find(
      search
        ? {
            $or: [
              { nombre: { $regex: search, $options: "i" } },
              { codigo: { $regex: search, $options: "i" } },
              { "tramitePadre.nombre": { $regex: search, $options: "i" } },
              { "tramitePadre.codigo": { $regex: search, $options: "i" } },
              { "areaFuncional.nombre": { $regex: search, $options: "i" } },
              { "areaFuncional.codigo": { $regex: search, $options: "i" } },
            ],
          }
        : {}
    ).sort({ createdAt: -1 });

    res.send({
      expedientTypes,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const findByParent = async (
  req: Request<{
    parent: number;
  }>,
  res: Response,
  next: NextFunction
) => {
  const { parent = null } = req.query;
  try {
    let expedientTypes = [];
    if (parent) {
      expedientTypes = await ExpedientType.find({ tramitePadre: parent })
        .populate({ path: "hijos" })
        .sort({
          createdAt: -1,
        })
        .exec();
    } else {
      expedientTypes = await ExpedientType.find({
        tramitePadre: null,
      })
        .populate({ path: "hijos" })
        .sort({ createdAt: -1 })
        .exec();
    }

    res.send({
      expedientTypes,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
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
      body,
      files,
      params: { id },
    } = req;

    const { data } = body;

    let dataJSON = JSON.parse(data);

    if (!dataJSON.tramitePadre) {
      delete dataJSON.tramitePadre;
    }

    if (files) {
      var fileKeys = Object.keys(files);
      fileKeys.forEach(function (key) {
        let path = "";
        const [section, fieldName] = key.split("/");
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
                      ...(resource?.archivos ? resource.archivos : []),
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
        // filesToDelete.forEach((file) => {
        //   fs.unlink(BASE_PATH + "/" + file, (err) => {
        //     if (err) {
        //       console.log("file error", err);
        //     }
        //   });
        // });
      });
    }

    const expedientType = await ExpedientType.findOneAndUpdate(
      { _id: id },
      {
        $set: dataJSON,
      },
      {
        upsert: true,
        new: true,
      }
    ).populate("tramitePadre");

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
