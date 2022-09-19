import {
  GuardadoEn,
  EstadoExpedientes,
  Expediente,
  FormaDePagoTipo,
  HonorariosYSuplidosTipo,
  RequerimientoDelExpedienteTipo,
  ExpedienteTipo,
} from "./utils/types";

export const tipoDeExpedientes: ExpedienteTipo[] = [
  {
    nombre: "Extrangeria",
    honorarios: 199,
    requerimientos: [
      {
        nombre: "Nombre y apellidos",
        tipo: RequerimientoDelExpedienteTipo.Texto,
        archivo: "",
        texto: "Texto puesto hasta ahora",
      },
      {
        nombre: "Foto de DNI",
        tipo: RequerimientoDelExpedienteTipo.Archivo,
        archivo: "",
        texto: "",
      },
    ],
  },
];

export const expedient: Expediente = {
  _id: "1",
  orden: "2",
  tipo: "Extrangeria",
  conexiones: "",
  guardadoEn: GuardadoEn.ExpedienteVigente, // ¿?
  responsable: "Mireia",
  codigoCliente: "928",
  codigoClienteProvisional: "123",
  cliente: "Juan Gomez Sierra",
  beneficiario: "Juan",
  asunto: "",
  fechaSolicitudServicioNotificacion: "",
  plazoLegal: "10 dias",
  estado: EstadoExpedientes.DocumentacionCompleta,
  empresa: "Apple",
  honorarios: 125,
  honorariosYSuplidos: [
    {
      cantidad: 50,
      tipo: HonorariosYSuplidosTipo.RM,
    },
    {
      cantidad: 100,
      tipo: HonorariosYSuplidosTipo.DS,
    },
  ],
  formaDePago: FormaDePagoTipo.Cheque,
  facturado: false,
  comprobadoTodo: false,
};

export const expedients: Expediente[] = [
  {
    _id: "1",
    orden: "2",
    tipo: "Extrangeria",
    conexiones: "",
    guardadoEn: GuardadoEn.ExpedienteVigente, // ¿?
    responsable: "Mireia",
    codigoCliente: "928",
    codigoClienteProvisional: "123",
    cliente: "Juan Gomez Sierra",
    beneficiario: "Juan",
    asunto: "",
    fechaSolicitudServicioNotificacion: "",
    plazoLegal: "10 dias",
    estado: EstadoExpedientes.Documentacion,
    empresa: "Apple",
    honorarios: 125,
    honorariosYSuplidos: [
      {
        cantidad: 50,
        tipo: HonorariosYSuplidosTipo.RM,
      },
      {
        cantidad: 100,
        tipo: HonorariosYSuplidosTipo.DS,
      },
    ],
    formaDePago: FormaDePagoTipo.Cheque,
    facturado: false,
    comprobadoTodo: false,
  },
  {
    _id: "1",
    orden: "2",
    tipo: "Extrangeria",
    conexiones: "",
    guardadoEn: GuardadoEn.EnCarpeta, // ¿?
    responsable: "Mireia",
    codigoCliente: "928",
    codigoClienteProvisional: "123",
    cliente: "Juan Gomez Sierra",
    beneficiario: "Juan",
    asunto: "",
    fechaSolicitudServicioNotificacion: "",
    plazoLegal: "10 dias",
    estado: EstadoExpedientes.Documentacion,
    empresa: "Apple",
    honorarios: 125,
    honorariosYSuplidos: [
      {
        cantidad: 50,
        tipo: HonorariosYSuplidosTipo.RM,
      },
      {
        cantidad: 100,
        tipo: HonorariosYSuplidosTipo.DS,
      },
    ],
    formaDePago: FormaDePagoTipo.Cheque,
    facturado: false,
    comprobadoTodo: false,
  },
  {
    _id: "1",
    orden: "2",
    tipo: "Extrangeria",
    conexiones: "",
    guardadoEn: GuardadoEn.Fisico, // ¿?
    responsable: "Mireia",
    codigoCliente: "928",
    codigoClienteProvisional: "123",
    cliente: "Juan Gomez Sierra",
    beneficiario: "Juan",
    asunto: "",
    fechaSolicitudServicioNotificacion: "",
    plazoLegal: "10 dias",
    estado: EstadoExpedientes.Documentacion,
    empresa: "Apple",
    honorarios: 125,
    honorariosYSuplidos: [
      {
        cantidad: 50,
        tipo: HonorariosYSuplidosTipo.RM,
      },
      {
        cantidad: 100,
        tipo: HonorariosYSuplidosTipo.DS,
      },
    ],
    formaDePago: FormaDePagoTipo.Cheque,
    facturado: false,
    comprobadoTodo: false,
  },
  {
    _id: "1",
    orden: "2",
    tipo: "Extrangeria",
    conexiones: "",
    guardadoEn: GuardadoEn.Fisico, // ¿?
    responsable: "Mireia",
    codigoCliente: "928",
    codigoClienteProvisional: "123",
    cliente: "Juan Gomez Sierra",
    beneficiario: "Juan",
    asunto: "",
    fechaSolicitudServicioNotificacion: "",
    plazoLegal: "10 dias",
    estado: EstadoExpedientes.Documentacion,
    empresa: "Apple",
    honorarios: 125,
    honorariosYSuplidos: [
      {
        cantidad: 50,
        tipo: HonorariosYSuplidosTipo.RM,
      },
      {
        cantidad: 100,
        tipo: HonorariosYSuplidosTipo.DS,
      },
    ],
    formaDePago: FormaDePagoTipo.Cheque,
    facturado: false,
    comprobadoTodo: false,
  },
];

export const listFields = [
  { label: "Id", value: "_id" },
  { label: "Orden", value: "orden" },
  { label: "Tipo", value: "tipo" },
  { label: "Vinculado", value: "vinculado" },
  { label: "Conexiones", value: "conexiones" },
  { label: "GuardadoEn", value: "guardadoEn" },
  { label: "Responsable", value: "responsable" },
  { label: "Codigo cliente", value: "codigoCliente" },
  { label: "Codigo cliente provisional", value: "codigoClienteProvisional" },
  { label: "Cliente", value: "cliente" },
  { label: "Beneficiario", value: "beneficiario" },
  { label: "Asunto", value: "asunto" },
  {
    label: "Fecha solicitud servicio notificacion",
    value: "echaSolicitudServicioNotificacion",
  },
  { label: "Plazo legal", value: "plazoLegal" },
  { label: "Estado", value: "estado" },
  { label: "Empresa", value: "empresa" },
  { label: "Honorarios", value: "honorarios" },
  // { label: "Honorarios y suplidos", value: "honorariosYSuplidos" },
  { label: "Forma de pago", value: "formaDePago" },
  { label: "Facturado", value: "facturado" },
  { label: "Comprobado todo", value: "comprobadoTodo" },
];
