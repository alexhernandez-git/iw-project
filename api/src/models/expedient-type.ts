import { Schema, model, Document } from "mongoose";
import { ExpedientResourceType, Models } from "../types";

const expedientTypeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: Models.User,
  },
  nombre: { type: String },
  codigo: { type: String, unique: true },
  areaFuncional: {
    type: Schema.Types.ObjectId,
    ref: Models.ExpedientType,
  },
  tramitePadre: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: Models.ExpedientType,
  },
  descripcion: { type: String },
  honorarios: { type: Number },
  borrado: { type: Boolean, default: false },
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
expedientTypeSchema.virtual("childrens", {
  ref: Models.ExpedientType, // The model to use
  localField: "_id", // Find people where localField
  foreignField: "tramitePadre", // is equal to foreignField
});
expedientTypeSchema.set("toObject", { virtuals: true });
expedientTypeSchema.set("toJSON", { virtuals: true });

const ExpedientType = model(Models.ExpedientType, expedientTypeSchema);
export { ExpedientType };
