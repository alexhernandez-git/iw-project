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
export interface IExpedient extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
  orden: string;
  tipo: Schema.Types.ObjectId;
  vinculado: Schema.Types.ObjectId;
  conexiones: string;
  guardadoEn: StoredIn;
  responsable: string;
  codigoCliente: string;
  codigoClienteProvisional: string;
  cliente: string;
  beneficiario: string;
  asunto: string;
  fechaSolicitudServicioNotificacion: string;
  plazoLegal: string;
  estado: ExpedientState;
  empresa: string;
  honorarios: number;
  honorariosYSuplidos: HonorariosYSuplidos[];
  formaDePago: PaymentType;
  facturado: boolean;
  comprobadoTodo: boolean;
  recursos: ExpedientResource[];
}

// 2. Create a Schema corresponding to the document interface.
const expedientSchema = new Schema<IExpedient>({
  _id: { type: String },
  orden: { type: String },
  tipo: { type: Schema.Types.ObjectId, ref: Models.ExpedientType },
  vinculado: { type: Schema.Types.ObjectId, ref: Models.Expedient },
  conexiones: { type: String },
  guardadoEn: StoredIn,
  responsable: { type: String },
  codigoCliente: { type: String },
  codigoClienteProvisional: { type: String },
  cliente: { type: String },
  beneficiario: { type: String },
  asunto: { type: String },
  fechaSolicitudServicioNotificacion: { type: String },
  plazoLegal: { type: String },
  estado: ExpedientState,
  empresa: { type: String },
  honorarios: { type: Number },
  formaDePago: { enum: PaymentType, type: String },
  facturado: { type: Boolean },
  comprobadoTodo: { type: Boolean },
  honorariosYSuplidos: [
    {
      tipo: { type: HonorariosYSuplidosType },
      cantidad: { type: Number },
    },
  ],
});

// 3. Create a Model.
const Expedient = model<IExpedient>(Models.Expedient, expedientSchema);
export { Expedient };
