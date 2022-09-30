export enum Type {
  Primary = "primary",
  Secondary = "secondary",
}

export enum ListItemType {
  Text = "text",
  List = "list",
  Button = "button",
}

export enum FormInputType {
  Text = "text",
  Select = "select",
}

export type FormInput = {
  type: FormInputType;
  name: string;
  label: string;
};

export enum EstadoExpedientes {
  Draft = "draft", // Para colaborador PENDIENTE
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
  descripcion: string;
};

export enum FormaDePagoTipo {
  Efectivo = "efectivo",
  Transferencia = "transferencia",
  Cheque = "cheque",
}

export enum RequerimientoDelExpedienteTipo {
  Texto = "texto",
  TextoLargo = "textolargo",
  Archivos = "archivos",
}

export type FieldData = {
  id: string;
  nombre: string;
  tipo: RequerimientoDelExpedienteTipo;
  archivo: string;
  texto: string;
  expediente: string;
  descripcion: string;
  custom?: boolean;
  disabled?: boolean;
  onDeleteField?: (id: string) => void;
};

export type RequerimientoDelExpedientes = {
  id: string;
  url: string;
};

export type RequerimientoDelExpediente = {
  id: string;
  nombre: string;
  tipo: RequerimientoDelExpedienteTipo;
  archivo: RequerimientoDelExpedientes[];
  texto: string;
  expediente: string;
  descripcion: string;
  custom?: boolean;
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
  silencioAdministrativo: boolean;
  silencioAdministrativoDias: number;
  silencioAdministrativoMeses: number;
  silencioAdministrativoAnos: number;
  silencioAdministrativosTipo: number; // DIAS | MESES | AÑOS
  suspensionRequerimientoDias: number;
  fecharResolucion: Date;
  tipoResolucion: string; // FABORABLE / NO FABORABLE
  documentoResolucion: string;
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

export type TramiteTipo = {
  nombre: string;
  codigo: string;
  tramitePadre: string;
  descripcio: string;
  honorarios: number;
  requerimientos: RequerimientoDelExpediente[];
};

// Expedient vinculat
// Expedient que va a una altre administració que esta vinculat amb un expedient

// Tabla de presupuestos
// Por definir

// els tramits tenen subcategorias
