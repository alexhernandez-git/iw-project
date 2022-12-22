// guardar on edit create

export type Filters = {
  label: string;
  name: string;
  options: {
    label: string;
    value: string | number | boolean;
    checked: boolean;
  }[];
};

export type SortOptions = {
  label: string;
  name: string;
  current: boolean;
};

export enum FiltersTypes {
  OneChoice = "onechoice",
  MultipleChoice = "multiplechoice",
}

export enum SortOptionsValues {
  NewestFirst = "newestfirst",
  OldestFirst = "oldestfirst",
  LegalTermCloseToDeadline = "legaltermclosetodeadline",
}

export enum SliceState {
  Inactive = "idle",
  Loading = "loading",
  Success = "success",
  Failed = "failed",
}

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
  Array = "array",
  Date = "date",
  Checkbox = "checkbox",
}

export enum UserRole {
  SuperAdmin = "superadmin",
  Admin = "admin",
  User = "user",
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
};

export type FormInput = {
  type: FormInputType;
  name: string;
  formik: any;
  label: string;
  options?: string[];
};

export enum ExpedientState {
  DocumentacionPendiente = "documentacionpendiente", // Para colaborador PENDIENTE
  DocumentacionCompleta = "documentacioncompleta", // Para colaborador PENDIENTE
  ExpedientCursadoNoConcluido = "expedientecursadonoconcluido", // Para colaborador EN TRAMITE
  // En este punto puede que se pida crear otro expediente amb orden (id del antiguo expediente)
  Concluido = "concluido",
  ResolucionFaborable = "resolucionfavorable",
  ResolucionDeNegatoria = "resoluciondenegatoria",
  NoResolucion = "noresolucion",
}

export enum HonorariosYSuplidosType {
  DenominacionSocial = "ds",
  RegistroMercantil = "rm",
  Notaria = "no",
  Tasas = "ta",
}

export enum StoredIn {
  EnCarpeta = "encarpeta",
  CurrentExpedient = "expedientevigente",
  Fisico = "fisico",
}

export type HonorariosYSuplidos = {
  tipo: HonorariosYSuplidosType;
  cantidad: number;
  descripcion: string;
};

export enum PaymentType {
  Efectivo = "efectivo",
  Transferencia = "transferencia",
  Cheque = "cheque",
}

export enum ExpedientRequirementType {
  Text = "text",
  LargeText = "largetext",
  Files = "files",
}

export type FieldData = {
  id: string;
  nombre: string;
  tipo: ExpedientRequirementType;
  archivo: string;
  texto: string;
  expediente: string;
  descripcion: string;
  custom?: boolean;
  editable?: boolean;
  disabled?: boolean;
  onDeleteField: (nombre: string) => void;
  onEditFieldLabel: (id: string, nombre: string) => void;
  onEditField: (nombre: string, text: string) => void;
  onEditFileField: (nombre: string, files: any) => void;
  getFieldValue: (nombre: string) => string;
  getFieldFiles: (nombre: string) => string[];
  getNotUploadedFieldFiles: (nombre: string) => string[];
  formik: any;
};

export type ExpedientsRequirement = {
  id: string;
  url: string;
};

export type ExpedientRequirement = {
  id: string;
  nombre: string;
  tipo: ExpedientRequirementType;
  archivos: string[];
  texto: string;
  expediente: string;
  descripcion: string;
  custom?: boolean;
};

export type Section = {
  nombre: string;
  recursos: ExpedientRequirement[];
};

export type Expedient = {
  _id: string;
  orden: string;
  areaFuncional: ExpedientType;
  isDocumentacionPendiente: boolean;
  tipo: string;
  vinculado: string;
  conexiones: string;
  guardadoEn: StoredIn;
  responsable: string;
  codigoCliente: string;
  codigoClienteProvisional: string;
  cliente: string;
  beneficiario: string;
  fecharResolucion: Date;
  documentoResolucion: string;
  asunto: string;
  fechaDePresentacion: Date;
  fechaNotificacionRequerimiento: Date;
  fechaSolicitud: string;
  fechaNotificacion: string;
  silencioAdministrativo: string;
  plazoLegal: string;
  estado: ExpedientState;
  empresa: string;
  honorarios: number;
  honorariosYSuplidos: HonorariosYSuplidos[];
  formaDePago: PaymentType;
  facturado: boolean;
  comprobadoTodo: boolean;
  secciones: Section[];
};

export type ExpedientType = {
  _id: string;
  nombre: string;
  codigo: string;
  tramitePadre: string;
  descripcio: string;
  isAreaFuncional: boolean;
  honorarios: number;
  secciones: Section[];
};

// Expedient vinculat
// Expedient que va a una altre administració que esta vinculat amb un expedient

// Tabla de presupuestos
// Por definir

// els tramits tenen subcategorias
