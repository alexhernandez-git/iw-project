import { Schema, model, Document } from "mongoose";
import {
  ExpedientResource,
  ExpedientState,
  HonorariosYSuplidos,
  HonorariosYSuplidosType,
  Models,
  PaymentType,
  StoredIn,
} from "../types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const expedientSchema = new Schema({
  _id: { type: String },
  orden: { type: String },
  tipo: { type: Schema.Types.ObjectId, ref: Models.ExpedientType },
  vinculado: { type: Schema.Types.ObjectId, ref: Models.Expedient },
  conexiones: { type: String },
  guardadoEn: { enum: StoredIn, type: String },
  responsable: { type: String },
  codigoCliente: { type: String },
  codigoClienteProvisional: { type: String },
  cliente: { type: String },
  beneficiario: { type: String },
  asunto: { type: String },
  fechaSolicitudServicioNotificacion: { type: String },
  plazoLegal: { type: String },
  estado: { enum: ExpedientState, type: String },
  empresa: { type: String },
  honorarios: { type: Number },
  formaDePago: { enum: PaymentType, type: String },
  facturado: { type: Boolean },
  comprobadoTodo: { type: Boolean },
  honorariosYSuplidos: [
    {
      tipo: { enum: HonorariosYSuplidosType, type: String },
      cantidad: { type: Number },
    },
  ],
});

// 3. Create a Model.
const Expedient = model(Models.Expedient, expedientSchema);
export { Expedient };
