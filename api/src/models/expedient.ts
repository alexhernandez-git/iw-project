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
  autoincrementalId: { type: Number, default: 0 },
  user: {
    type: Schema.Types.ObjectId,
    ref: Models.User,
  },
  areaFuncional: {
    type: Schema.Types.ObjectId,
    ref: Models.ExpedientType,
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
  observaciones: { type: String },
  codigoCliente: { type: String },
  borrado: { type: Boolean, default: false },
  codigoClienteProvisional: { type: String },
  cliente: { type: String },
  beneficiario: { type: String },
  fechaSolicitud: { type: Date },
  plazoLegal: { type: Date },
  silencioAdministrativo: { type: Date },
  fechaNotificacion: { type: Date },
  estado: {
    enum: ExpedientState,
    type: String,
    default: ExpedientState.DocumentacionPendiente,
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
  checkHonorarios: { type: Boolean },
  valueHonorarios: { type: Number },
  checkHonorariosYSuplidos: { type: Boolean },
  valueHonorariosYSuplidos: { type: Number },
  checkProvisionDeFondos: { type: Boolean },
  valueProvisionDeFondos: { type: Number },
  checkProvisionDeFondosYHonorarios: { type: Boolean },
  valueProvisionDeFondosYHonorarios: { type: Number },
  checkFacturacionGes: { type: Boolean },
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

expedientSchema.set("timestamps", true);
expedientSchema.index({ createdAt: -1 });
expedientSchema.index({ updatedAt: -1 });

expedientSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    let total = await Expedient.find().sort({ autoincrementalId: -1 }).limit(1);
    doc.autoincrementalId =
      total.length === 0 ? 1 : Number(total[0].autoincrementalId) + 1;
    next();
  }
});

const Expedient = model(Models.Expedient, expedientSchema);
export { Expedient };
