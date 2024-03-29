import { Request, Response, NextFunction } from "express";
import { ExpedientType } from "../models/expedient-type";
import { ExpedientResourceType, ExpedientState } from "../types";
import moment from "moment";
import { getAreaFuncional } from "../utils/helpers";
import { Expedient } from "../models/expedient";

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
        const [section, fieldName] = key.split("]-[");
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
        dataJSON = {
          ...dataJSON,
          secciones: dataJSON.secciones.map((sectionItem) =>
            sectionItem.nombre === section
              ? {
                  ...sectionItem,
                  recursos: sectionItem.recursos.map((resource) => {
                    console.log("resource nombre", resource.nombre);
                    console.log({ fieldName });
                    if (resource.nombre === fieldName) {
                      console.log("entra 2");
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
          ),
        };
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
      expedientTypes = await ExpedientType.find({
        borrado: {$ne: true}
      })
        .sort({ createdAt: -1 })
        .select({
          nombre: 1,
          _id: 1,
          codigo: 1,
          tramitePadre: 1,
          isAreaFuncional: 1,
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
              borrado: {$ne: true}  
            }
          : {
            borrado: {$ne: true}  
          }
      )
        .sort({ createdAt: -1 })
        .limit(Number(limit) * 1)
        .skip((Number(page) - 1) * Number(limit))
        .exec();
    }

    res.send({
      count: await ExpedientType.find({
        borrado: {$ne: true}
      }).count(),
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
      borrado: {$ne: true}
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
    const expedientTypes = await ExpedientType.find({borrado: {$ne: true}}).select({
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
            borrado: {$ne: true}
          }
        : {
          borrado: {$ne: true}
        }
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
      expedientTypes = await ExpedientType.find({ 
        tramitePadre: parent,  
        borrado: {$ne: true}
      })
        .populate({ path: "hijos" })
        .sort({
          createdAt: -1,
        })
        .exec();
    } else {
      expedientTypes = await ExpedientType.find({
        borrado: {$ne: true},
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
    type: string;
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
    console.log("entraaaa");
    const {
      body,
      files,
      params: { id },
    } = req;

    const { data } = body;

    console.log({ data });

    let dataJSON = JSON.parse(data);

    console.log({ dataJSON });

    if (!dataJSON.tramitePadre) {
      delete dataJSON.tramitePadre;
    }
    console.log(dataJSON)
    if (data?.type === "expedient") {
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
    } else {
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
    }
  } catch (error) {
    console.log(error.message);
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};

export const updateFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body
      files,
      params: { id },
    } = req;
    
    console.log({body})
    console.log({files: files.files})
    console.log({id})

    const {fieldName, sectionName} = body

    const file = files.files;


    console.log("entra 1");

    console.log(file);

    const fileName = `${moment().format("YYYY-MM-DD HH:mm:ss")}]-[${file.name}`;
    const path = `${BASE_PATH}/${fileName}`;
    file.mv(path);

    console.log({ fileName });

    const expedientType = await ExpedientType.findById(id);

    if (expedientType) {
      const { secciones } = expedientType;

      if (secciones?.[0]) {
        expedientType.secciones = secciones.map((sectionItem) =>
          sectionItem.nombre === sectionName
            ? {
                ...sectionItem,
                recursos: sectionItem.recursos.map((resource) => {
                  console.log("resource nombre", resource.nombre);
                  console.log({ fieldName });
                  if (resource.nombre === fieldName) {
                    console.log("entra 2");
                    return {
                      ...resource,
                      archivos: [fileName],
                    };
                  } else {
                    return resource;
                  }
                }),
              }
            : sectionItem
        );
        expedientType.save();
      }
    }

    res.send({ expedientType, success: true });
  } catch (error) {
    console.log("entra message error");
    console.log({error: error.message});
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

    await ExpedientType.findByIdAndDelete(id);

    res.send({ success: true });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error creating user",
    });
  }
};
