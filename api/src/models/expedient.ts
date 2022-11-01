import { Schema, model, Document } from "mongoose";
import {
  ExpedientResourceType,
  ExpedientState,
  HonorariosYSuplidosType,
  Models,
  PaymentType,
  StoredIn,
} from "../types";

const expedientSchema = new Schema({
  orden: { type: String },
  tipo: { type: Schema.Types.ObjectId, ref: Models.ExpedientType },
  vinculado: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: Models.Expedient,
  },
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

const Expedient = model(Models.Expedient, expedientSchema);
export { Expedient };
