import { Schema, model, Document } from "mongoose";
import { Models } from "../types";

// 1. Create an interface representing a document in MongoDB.
export interface IExpedientType extends Document {
  nombre: string;
  codigo: string;
  tramitePadre: Schema.Types.ObjectId;
  descripcion: string;
  honorarios: number;
  recursos: Schema.Types.ObjectId[];
}

// 2. Create a Schema corresponding to the document interface.
const expedientTypeSchema = new Schema<IExpedientType>({
  nombre: { type: String },
  codigo: { type: String },
  tramitePadre: { type: Schema.Types.ObjectId, ref: Models.ExpedientType },
  descripcion: { type: String },
  honorarios: { type: Number },
  recursos: [{ type: Schema.Types.ObjectId, ref: Models.ExpedientResource }],
});

// 3. Create a Model.
const ExpedientType = model<IExpedientType>(
  Models.ExpedientType,
  expedientTypeSchema
);
export { ExpedientType };
