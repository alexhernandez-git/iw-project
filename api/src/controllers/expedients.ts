import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { Expedient } from "../models/expedient";
import { ExpedientType } from "../models/expedient-type";
import {
  ExpedientResourceType,
  ExpedientState,
  HonorariosYSuplidosType,
  SortOptionsValues,
  StoredIn,
  UserRoles,
} from "../types";
import moment from "moment";
import { getAreaFuncional } from "../utils/helpers";

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

    let areaFuncional = await getAreaFuncional(tipo);

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

    if (!expedient) {
      return res.send({
        statusCode: 404,
        message: "Expediente no encontrado",
      });
    }

    res.send({ expedient, success: true });
  } catch (error) {
    console.log(error.message);
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
    estado?: ExpedientState[];
    guardadoen?: StoredIn[];
    facturado?: boolean[];
    areafuncional?: string[];
    tipo?: string[];
    partners?: string[];
    sort?: SortOptionsValues;
  }>,
  res: Response,
  next: NextFunction
) => {
  let {
    page = 1,
    limit = 10,
    search,
    partners = null,
    estado = null,
    guardadoen = null,
    facturado = null,
    areafuncional = null,
    tipo = null,
    sort = null,
  } = req.query;

  console.log({
    estado,
    guardadoen,
    facturado,
    partners,
    areafuncional,
    tipo,
    sort,
  });

  console.log({ areafuncional });

  try {
    let usersFilter =
      req.user.role !== UserRoles.SuperAdmin ? [req.user._id] : [];

    if (partners) {
      usersFilter = [...usersFilter, ...partners];
    }
    const expedients = await Expedient.find({
      ...(req.user.role !== UserRoles.SuperAdmin
        ? {
            user: { $in: usersFilter },
          }
        : {}),
      ...(estado
        ? {
            estado: { $in: estado },
          }
        : {}),
      ...(guardadoen
        ? {
            guardadoEn: { $in: guardadoen },
          }
        : {}),
      ...(facturado
        ? {
            facturado: { $in: facturado },
          }
        : {}),
      ...(areafuncional
        ? {
            areaFuncional: { $in: areafuncional },
          }
        : {}),
      ...(tipo
        ? {
            tipo: { $in: tipo },
          }
        : {}),
      ...(search
        ? {
            $or: [
              { conexiones: { $regex: search, $options: "i" } },
              { empresa: { $regex: search, $options: "i" } },
              { responsable: { $regex: search, $options: "i" } },
            ],
          }
        : {}),
    })
      .sort({ createdAt: sort === SortOptionsValues.OldestFirst ? 1 : -1 })
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
        // filesToDelete.forEach((file) => {
        //   fs.unlink(BASE_PATH + "/" + file, (err) => {
        //     if (err) {
        //       console.log("file error", err);
        //     }
        //   });
        // });
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

    //Check if expedient is ready to DocumentacionCompleta
    if (expedient.estado === ExpedientState.DocumentacionPendiente) {
      let haveEmptyFields: boolean = true;
      expedient.secciones.forEach((seccion) => {
        seccion.recursos.forEach((recurso) => {
          if (
            recurso.tipo === ExpedientResourceType.Files &&
            recurso.archivos.length > 0
          ) {
            haveEmptyFields = false;
          } else if (
            recurso.tipo === ExpedientResourceType.Text ||
            (recurso.tipo === ExpedientResourceType.LargeText && recurso.texto)
          ) {
            haveEmptyFields = false;
          }
        });
      });
      if (!haveEmptyFields) {
        expedient.estado = ExpedientState.DocumentacionCompleta;
        expedient.save();
      }
    }

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
