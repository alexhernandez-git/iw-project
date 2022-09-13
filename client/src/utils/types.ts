export enum Type {
  Primary = "primary",
  Secondary = "secondary",
}

export enum EstadoExpedientes {
  EnEstudio = "enestudio",
  Documentacion = "documentacion",
  DocumentacionCompleta = "documentacioncompleta",
  ExpedienteCursadoNoConcluido = "expedientecursadonoconcluido",
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

export type Expediente = {
  _id: string;
  orden: string;
  tipo: string;
  conexiones: string;
  guardadoEn: GuardadoEn; // ¿?
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
