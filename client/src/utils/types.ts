export enum Type {
  Primary = "primary",
  Secondary = "secondary",
}

export enum EstadoExpedientes {
  EnEstudio = "enestudio", // Para colaborador PENDIENTE
  PeticionDocumentacion = "peticiondocumentacion", // Para colaborador PENDIENTE
  DocumentacionCompleta = "documentacioncompleta", // Para colaborador PENDIENTE
  ExpedienteCursadoNoConcluido = "expedientecursadonoconcluido", // Para colaborador EN TRAMITE
  // En este punto puede que se pida crear otro expediente amb orden (id del antiguo expediente)
  Concluido = "concluido",
}

export enum HonorariosYSuplidosTipo {
  DS = "denominacionsocial",
  RM = "registromercantil",
  NO = "notaria",
  TA = "tasas",
}

export enum GuardadoEn {
  EnCarpeta = "encarpeta",
  ExpedienteVigente = "expedientevigente",
  Fisico = "fisico",
}

export type HonorariosYSuplidos = {
  tipo: HonorariosYSuplidosTipo;
  cantidad: number;
};

export enum FormaDePagoTipo {
  Efectivo = "efectivo",
  Transferencia = "transferencia",
  Cheque = "cheque",
}

export enum RequerimientoDelExpedienteTipo {
  Texto = "texto",
  TextoLargo = "textolargo",
  Archivo = "archivo",
}

export type RequerimientoDelExpediente = {
  nombre: string;
  tipo: RequerimientoDelExpedienteTipo;
  archivo: string;
  texto: string;
  expediente: string;
  descripcion: string;
};

export type Expediente = {
  _id: string;
  orden: string;
  isDraft: boolean;
  tipo: string;
  vinculado: string;
  conexiones: string;
  guardadoEn: GuardadoEn;
  responsable: string;
  codigoCliente: string;
  codigoClienteProvisional: string;
  cliente: string;
  beneficiario: string;
  asunto: string;
  fechaSolicitudServicioNotificacion: string;
  plazoLegal: string;
  estado: EstadoExpedientes;
  empresa: string;
  honorarios: number;
  honorariosYSuplidos: HonorariosYSuplidos[];
  formaDePago: FormaDePagoTipo;
  facturado: boolean;
  comprobadoTodo: boolean;
  requerimientos: RequerimientoDelExpediente[];
};

export type ExpedienteTipo = {
  nombre: string;
  honorarios: number;
  requerimientos: RequerimientoDelExpediente[];
};

// Expedient vinculat
// Expedient que va a una altre administració que esta vinculat amb un expedient

// Tabla de presupuestos
// Por definir
