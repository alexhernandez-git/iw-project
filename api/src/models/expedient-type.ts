import { Schema, model, Document } from "mongoose";
import { ExpedientResourceType, Models } from "../types";

const expedientTypeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: Models.User,
  },
  nombre: { type: String },
  codigo: { type: String, unique: true },
  tramitePadre: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: Models.ExpedientType,
  },
  descripcion: { type: String },
  honorarios: { type: Number },
  isAreaFuncional: { type: Boolean, default: false },
  secciones: [
    {
      nombre: String,
      recursos: [
        {
          nombre: { type: String },
          tipo: { type: String, enum: ExpedientResourceType },
          texto: { type: String },
          archivos: [{ type: String }],
          expediente: { type: String },
          descripcion: { type: String },
        },
      ],
    },
  ],
});

expedientTypeSchema.set("timestamps", true);
expedientTypeSchema.index({ createdAt: -1 });
expedientTypeSchema.index({ updatedAt: -1 });

const ExpedientType = model(Models.ExpedientType, expedientTypeSchema);
export { ExpedientType };
