import { Schema, model, Document } from "mongoose";
import { ExpedientResourceType, Models } from "../types";

// 1. Create an interface representing a document in MongoDB.
export interface IExpedientResource extends Document {
  id: string;
  nombre: string;
  tipo: ExpedientResourceType;
  texto: string;
  expediente: string;
  descripcion: string;
  custom?: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const expedientTypeSchema = new Schema<IExpedientResource>({
  id: { type: String },
  nombre: { type: String },
  tipo: { enum: ExpedientResourceType },
  texto: { type: String },
  expediente: { type: String },
  descripcion: { type: String },
  custom: { type: Boolean },
});

// 3. Create a Model.
const ExpedientResource = model<IExpedientResource>(
  Models.ExpedientResource,
  expedientTypeSchema
);
export { ExpedientResource };
