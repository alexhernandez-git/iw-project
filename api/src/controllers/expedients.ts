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
import { getAreaFuncional, getFileName } from "../utils/helpers";
import utf8 from "utf8";

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

    let expedientType = null;

    await ExpedientType.findById(tipo).exec(function (dbErr, modelDoc) {
      if (dbErr) return;
      expedientType = modelDoc.toJSON();
    });

    console.log(expedientType);

    let areaFuncional = await getAreaFuncional(tipo);

    const expedient = await Expedient.create({
      tipo: new Types.ObjectId(tipo),
      areaFuncional,
      vinculado: vinculado,
      secciones: JSON.parse(JSON.stringify(expedientType?.secciones)) ?? [],
      fechaSolicitud: Date.now(),
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
    }).populate(["tipo", "vinculado", "areaFuncional", "user"]);

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
  req.get("Accept-Charset");
  req.acceptsCharsets("UTF-8");
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

  console.log(
    sort?.length > 0 && sort[0] === SortOptionsValues.LegalTermCloseToDeadline
  );

  try {
    console.log(req.user);
    console.log({ partners });
    let usersFilter =
      req.user.role === UserRoles.SuperAdmin ||
      req.user.role === UserRoles.Admin
        ? []
        : [req.user._id];

    if (partners) {
      usersFilter = partners;
    }

    console.log({ usersFilter });
    const expedients = await Expedient.find({
      ...(req.user.role !== UserRoles.SuperAdmin &&
      req.user.role !== UserRoles.Admin
        ? {
            user: { $in: usersFilter },
          }
        : usersFilter && usersFilter?.length > 0
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

      ...(sort?.length > 0 &&
      sort[0] === SortOptionsValues.LegalTermCloseToDeadline
        ? {
            plazoLegal: { $gte: new Date() },
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
      .sort({
        ...(sort?.length > 0 && sort[0] === SortOptionsValues.OldestFirst
          ? { createdAt: 1 }
          : {}),
        ...(sort?.length > 0 && sort[0] === SortOptionsValues.NewestFirst
          ? { createdAt: -1 }
          : {}),
        ...(sort?.length > 0 &&
        sort[0] === SortOptionsValues.LegalTermCloseToDeadline
          ? { plazoLegal: 1 }
          : {}),
        ...(!sort?.length ? { createdAt: -1 } : {}),
      })
      .populate(["tipo", "vinculado", "areaFuncional", "user"])
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
    fechaNotificacion: string;
    fechaSolicitud: string;
    plazoLegal: string;
    silencioAdministrativo: string;
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
  console.log("entraaa");
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
        const [section, fieldName] = utf8.decode(key).split("]-[");
        const file = files[key];
        const itemNames = [];
        if (Array.isArray(file)) {
          file.forEach((fileItem) => {
            const fileName = `${moment().format(
              "YYYY-MM-DD HH:mm:ss"
            )}]-[${getFileName(fileItem.name)}`;
            path = `${BASE_PATH}/${fileName}`;
            fileItem.mv(path);
            itemNames.push(fileName);
          });
        } else {
          const fileName = `${moment().format(
            "YYYY-MM-DD HH:mm:ss"
          )}]-[${getFileName(file.name)}`;
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

    const expedient = await Expedient.findByIdAndUpdate(
      id,
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
      let haveEmptyFields: boolean = false;
      dataJSON.secciones.forEach((seccion) => {
        console.log({ recursos: seccion.recursos });
        seccion.recursos.forEach((recurso) => {
          if (
            recurso.tipo === ExpedientResourceType.Files &&
            !recurso.archivos?.[0]
          ) {
            console.log({ archivos: recurso.archivos });
            haveEmptyFields = true;
          } else if (
            (recurso.tipo === ExpedientResourceType.Text ||
              recurso.tipo === ExpedientResourceType.LargeText) &&
            (!recurso.texto || recurso.texto === "")
          ) {
            haveEmptyFields = true;
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
    console.log("entra message error");
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
