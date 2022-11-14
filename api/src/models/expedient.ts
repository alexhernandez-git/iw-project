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
  user: {
    type: Schema.Types.ObjectId,
    ref: Models.User,
  },
  orden: { type: String },
  tipo: { type: Schema.Types.ObjectId, ref: Models.ExpedientType },
  vinculado: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: Models.Expedient,
  },
  conexiones: { type: String },
  guardadoEn: {
    enum: StoredIn,
    type: String,
    default: StoredIn.SinEspecificar,
  },
  responsable: { type: String },
  codigoCliente: { type: String },
  codigoClienteProvisional: { type: String },
  cliente: { type: String },
  beneficiario: { type: String },
  fechaSolicitudServicioNotificacion: { type: Date },
  silencioAdministrativo: { type: Boolean },
  silencioAdministrativoTiempo: { type: Number },
  suspensionRequerimientoTiempo: { type: Number },
  plazoLegal: { type: String },
  estado: {
    enum: ExpedientState,
    type: String,
    default: ExpedientState.Borrador,
  },
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
        },
      ],
    },
  ],
});

expedientSchema.set("timestamps", true);
expedientSchema.index({ createdAt: 1 });
expedientSchema.index({ updatedAt: 1 });

const Expedient = model(Models.Expedient, expedientSchema);
export { Expedient };
