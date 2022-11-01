import { Schema, model, Document } from "mongoose";
import { ExpedientResourceType, Models } from "../types";

const expedientTypeSchema = new Schema({
  nombre: { type: String },
  codigo: { type: String },
  tramitePadre: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: Models.ExpedientType,
  },
  descripcion: { type: String },
  honorarios: { type: Number },
  secciones: [
    {
      nombre: String,
      recursos: [
        {
          nombre: { type: String },
          tipo: { type: String, enum: ExpedientResourceType },
          texto: { type: String },
          expediente: { type: String },
          descripcion: { type: String },
          custom: { type: Boolean },
        },
      ],
    },
  ],
});

const ExpedientType = model(Models.ExpedientType, expedientTypeSchema);
export { ExpedientType };
