export enum Models {
  ExpedientType = "ExpedientType",
  Expedient = "Expedient",
  User = "User",
  ExpedientResource = "ExpedientResource",
}

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

export enum PaymentType {
  Efectivo = "efectivo",
  Transferencia = "transferencia",
  Cheque = "cheque",
}

export enum ExpedientState {
  EnEstudio = "enestudio", // Para colaborador PENDIENTE
  PeticionDocumentacion = "peticiondocumentacion", // Para colaborador PENDIENTE
  DocumentacionCompleta = "documentacioncompleta", // Para colaborador PENDIENTE
  ExpedienteCursadoNoConcluido = "expedientecursadonoconcluido", // Para colaborador EN TRAMITE
  // En este punto puede que se pida crear otro expediente amb orden (id del antiguo expediente)
  Concluido = "concluido",
}

export enum HonorariosYSuplidosType {
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

export enum StoredIn {
  EnCarpeta = "encarpeta",
  CurrentExpedient = "expedientevigente",
  Fisico = "fisico",
}

export type HonorariosYSuplidos = {
  tipo: HonorariosYSuplidosType;
  cantidad: number;
};

export type ExpedienteTipo = {
  nombre: string;
  honorarios: number;
  archivoDeRequerimientos: string;
};

export enum ExpedientResourceType {
  Texto = "texto",
  TextoLargo = "textolargo",
  Archivo = "archivo",
}

export type RequerimientoDelExpediente = {
  nombre: string;
  tipo: ExpedientResourceType;
  expediente: string;
};

export type RequerimientoDelExpedienteUsuario = {
  archivo: string;
  texto: string;
  tipo: ExpedientResourceType;
  expediente: string;
  usuario: string;
};

export type Expediente = {
  _id: string;
  orden: string;
  tipo: ExpedienteTipo;
  vinculado: string;
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
};

export type ExpedientResourceFile = {
  id: string;
  url: string;
};

export type ExpedientResource = {
  id: string;
  nombre: string;
  tipo: ExpedientResourceType;
  texto: string;
  expediente: string;
  descripcion: string;
  custom?: boolean;
};

export enum ExpedientResourceType {
  Text = "text",
  LargeText = "largetext",
  Files = "files",
}

export type ExpedientType = {
  nombre: string;
  codigo: string;
  tramitePadre: string;
  descripcio: string;
  honorarios: number;
  recursos: ExpedientResource[];
};
