import { Schema, model, Document } from "mongoose";
import {
  ExpedientResourceType,
  ExpedientState,
  HonorariosYSuplidosType,
  Models,
  PaymentType,
  StoredIn,
} from "../types";

var CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
var counter = model("counter", CounterSchema);

const expedientSchema = new Schema({
  code: { type: Number },
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
expedientSchema.pre("save", function (next) {
  var doc = this;
  counter.findByIdAndUpdate(
    { _id: String(doc._id) + doc.user._id },
    { $inc: { seq: 1 } },
    function (error, counter) {
      if (error) return next(error);
      doc.code = counter.seq;
      next();
    }
  );
});

const Expedient = model(Models.Expedient, expedientSchema);
export { Expedient };
