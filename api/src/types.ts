export enum UserRoles {
  SuperAdmin = "superadmin",
  Admin = "admin",
  User = "user",
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoles;
};

export type Token = {
  userId: string;
  token: string;
  createdAt: Date;
};

export enum Sexo {
  Hombre = "h",
  Mujer = "m",
}

export enum FormaDePagoTipo {
  Efectivo = "efectivo",
  Transferencia = "transferencia",
  Cheque = "cheque",
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

export enum EstadoCivil {
  Soltero = "s",
  Casado = "c",
  Viudo = "v",
  Divorciado = "d",
  SinPareja = "sp",
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

export type ExpedienteTipo = {
  nombre: string;
  honorarios: number;
  archivoDeRequerimientos: string;
};

export enum RequerimientoDelExpedienteTipo {
  Texto = "texto",
  TextoLargo = "textolargo",
  Archivo = "archivo",
}

export type RequerimientoDelExpediente = {
  nombre: string;
  tipo: RequerimientoDelExpedienteTipo;
  expediente: string;
};

export type RequerimientoDelExpedienteUsuario = {
  archivo: string;
  texto: string;
  tipo: RequerimientoDelExpedienteTipo;
  expediente: string;
  usuario: string;
};

export type Expediente = {
  _id: string;
  orden: string;
  tipo: ExpedienteTipo;
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
};
