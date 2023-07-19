import {
  StoredIn,
  ExpedientState,
  Expedient,
  PaymentType,
  HonorariosYSuplidosType,
  ExpedientRequirementType,
  ExpedientType,
  UserRole,
} from "./utils/types";

export const user = {
  firstName: "Alex",
  lastName: "Hernandez",
  email: "alex@gmail.com",
  role: UserRole.SuperAdmin,
};

export const token: string =
  "jfewowjefao8w3joifwioahfoiehwafwa80efiweajwofihoih";

export const expedientTypes: ExpedientType[] = [
  {
    nombre: "Extrangeria",
    codigo: "1",
    honorarios: 199,
    secciones: [
      {
        nombre: "seccion 1",
        recursos: [
          {
            id: "1",
            nombre: "Nombre y apellidos",
            tipo: ExpedientRequirementType.Text,
            texto: "Texto puesto hasta ahora",
            custom: false,
          },
          {
            id: "2",
            nombre: "Foto de DNI",
            tipo: ExpedientRequirementType.Files,
            texto: "",
            custom: false,
          },
          {
            id: "3",
            nombre: "Explicacion de motivos del tramite",
            tipo: ExpedientRequirementType.LargeText,
            texto: "Empece a escribir ayer y puedo continuar hoy",
            custom: false,
          },
          {
            id: "4",
            nombre: "Explicacion de motivos del tramite",
            tipo: ExpedientRequirementType.LargeText,
            texto: "Empece a escribir ayer y puedo continuar hoy",
            custom: false,
          },
        ],
      },
    ],
  },
];

export const expedient: Expedient = {
  _id: "1",
  tipo: "Extrangeria",
  conexiones: "",
  guardadoEn: StoredIn.CurrentExpedient, // ¿?
  responsable: "Mireia",
  codigoCliente: "928",
  codigoClienteProvisional: "123",
  cliente: "Juan Gomez Sierra",
  beneficiario: "Juan",
  asunto: "",
  fechaSolicitud: "",
  plazoLegal: "10 dias",
  estado: ExpedientState.DocumentacionCompleta,
  empresa: "Apple",
  honorarios: 125,
  honorariosYSuplidos: [
    {
      cantidad: 50,
      tipo: HonorariosYSuplidosType.RegistroMercantil,
    },
    {
      cantidad: 100,
      tipo: HonorariosYSuplidosType.DenominacionSocial,
    },
  ],
  formaDePago: PaymentType.Cheque,
  facturado: false,
  comprobadoTodo: false,
  secciones: [
    {
      nombre: "seccion 1",
      recursos: [
        {
          id: "1",
          nombre: "Nombre y apellidos",
          tipo: ExpedientRequirementType.Text,
          texto: "Texto puesto hasta ahora",
          custom: false,
        },
        {
          id: "2",
          nombre: "Foto de DNI",
          tipo: ExpedientRequirementType.Files,
          texto: "",
          custom: false,
        },
        {
          id: "3",
          nombre: "Explicacion de motivos del tramite",
          tipo: ExpedientRequirementType.LargeText,
          texto: "Empece a escribir ayer y puedo continuar hoy",
          custom: false,
        },
        {
          id: "4",
          nombre: "Explicacion de motivos del tramite",
          tipo: ExpedientRequirementType.LargeText,
          texto: "Empece a escribir ayer y puedo continuar hoy",
          custom: false,
        },
      ],
    },
  ],
};

export const expedients: Expedient[] = [
  {
    _id: "1",
    tipo: "Extrangeria",
    conexiones: "",
    guardadoEn: StoredIn.CurrentExpedient, // ¿?
    responsable: "Mireia",
    vinculado: "Expedient 2",
    codigoCliente: "928",
    codigoClienteProvisional: "123",
    cliente: "Juan Gomez Sierra",
    beneficiario: "Juan",
    asunto: "",
    fechaSolicitud: "",
    plazoLegal: "10 dias",
    estado: ExpedientState.Documentacion,
    empresa: "Apple",
    honorarios: 125,
    honorariosYSuplidos: [
      {
        cantidad: 50,
        tipo: HonorariosYSuplidosType.RegistroMercantil,
      },
      {
        cantidad: 100,
        tipo: HonorariosYSuplidosType.DenominacionSocial,
      },
    ],
    formaDePago: PaymentType.Cheque,
    facturado: false,
    comprobadoTodo: false,
    recursos: [
      {
        id: "1",
        nombre: "Nombre y apellidos",
        tipo: ExpedientRequirementType.Text,
        texto: "Texto puesto hasta ahora",
        custom: false,
      },
      {
        id: "2",
        nombre: "Foto de DNI",
        tipo: ExpedientRequirementType.Files,
        texto: "",
        custom: false,
      },
      {
        id: "3",
        nombre: "Explicacion de motivos del tramite",
        tipo: ExpedientRequirementType.LargeText,
        texto: "Empece a escribir ayer y puedo continuar hoy",
        custom: false,
      },
      {
        id: "3",
        nombre: "Explicacion de motivos del tramite",
        tipo: ExpedientRequirementType.LargeText,
        texto: "Empece a escribir ayer y puedo continuar hoy",
        custom: false,
      },
    ],
  },
  {
    _id: "1",
    tipo: "Extrangeria",
    conexiones: "",
    guardadoEn: StoredIn.EnCarpeta, // ¿?
    responsable: "Mireia",
    codigoCliente: "928",
    codigoClienteProvisional: "123",
    cliente: "Juan Gomez Sierra",
    beneficiario: "Juan",
    asunto: "",
    fechaSolicitud: "",
    plazoLegal: "10 dias",
    estado: ExpedientState.DocumentacionCompleta,
    empresa: "Apple",
    honorarios: 125,
    honorariosYSuplidos: [
      {
        cantidad: 50,
        tipo: HonorariosYSuplidosType.RegistroMercantil,
      },
      {
        cantidad: 100,
        tipo: HonorariosYSuplidosType.DenominacionSocial,
      },
    ],
    formaDePago: PaymentType.Cheque,
    facturado: false,
    comprobadoTodo: false,
  },
  {
    _id: "1",
    tipo: "Extrangeria",
    conexiones: "",
    guardadoEn: StoredIn.Fisico, // ¿?
    responsable: "Mireia",
    codigoCliente: "928",
    codigoClienteProvisional: "123",
    cliente: "Juan Gomez Sierra",
    beneficiario: "Juan",
    asunto: "",
    fechaSolicitud: "",
    plazoLegal: "10 dias",
    estado: ExpedientState.DocumentacionCompleta,
    empresa: "Apple",
    honorarios: 125,
    honorariosYSuplidos: [
      {
        cantidad: 50,
        tipo: HonorariosYSuplidosType.RegistroMercantil,
      },
      {
        cantidad: 100,
        tipo: HonorariosYSuplidosType.DenominacionSocial,
      },
    ],
    formaDePago: PaymentType.Cheque,
    facturado: false,
    comprobadoTodo: false,
  },
  {
    _id: "1",
    tipo: "Extrangeria",
    conexiones: "",
    guardadoEn: StoredIn.Fisico, // ¿?
    responsable: "Mireia",
    codigoCliente: "928",
    codigoClienteProvisional: "123",
    cliente: "Juan Gomez Sierra",
    beneficiario: "Juan",
    asunto: "",
    fechaSolicitud: "",
    plazoLegal: "10 dias",
    estado: ExpedientState.Documentacion,
    empresa: "Apple",
    honorarios: 125,
    honorariosYSuplidos: [
      {
        cantidad: 50,
        tipo: HonorariosYSuplidosType.RegistroMercantil,
      },
      {
        cantidad: 100,
        tipo: HonorariosYSuplidosType.DenominacionSocial,
      },
    ],
    formaDePago: PaymentType.Cheque,
    facturado: false,
    comprobadoTodo: false,
  },
];

export const listFields = {
  [UserRole.User]: [
    { label: "ID / Código Expediente", value: "autoincrementalId" },
    { label: "Tipo", value: "tipo" },
    { label: "Responsable", value: "responsable" },
    { label: "Cliente", value: "cliente" },
    { label: "Beneficiario", value: "beneficiario" },
    { label: "Asunto", value: "asunto" },
    {
      label: "Fecha solicitud",
      value: "fechaSolicitud",
    },
    {
      label: "Fecha notificación",
      value: "fechaNotificacion",
    },
    { label: "Estado", value: "estado" },
    { label: "Empresa", value: "empresa" },
  ],
  [UserRole.Admin]: [
    { label: "ID / Código Expediente", value: "autoincrementalId" },
    { label: "Colaborador", value: "colaborador" },
    { label: "Tipo", value: "tipo" },
    { label: "Vinculado", value: "vinculado" },
    { label: "Conectividad", value: "conexiones" },
    { label: "Observaciones", value: "observaciones" },
    { label: "Guardado en", value: "guardadoEn" },
    { label: "Responsable", value: "responsable" },
    { label: "Codigo cliente", value: "codigoCliente" },
    { label: "Codigo cliente provisional", value: "codigoClienteProvisional" },
    { label: "Cliente", value: "cliente" },
    { label: "Beneficiario", value: "beneficiario" },
    { label: "Asunto", value: "asunto" },
    {
      label: "Fecha solicitud",
      value: "fechaSolicitud",
    },
    {
      label: "Silencio administrativo",
      value: "silencioAdministrativo",
    },
    {
      label: "Fecha notificación",
      value: "fechaNotificacion",
    },
    { label: "Plazo legal", value: "plazoLegal" },
    { label: "Estado", value: "estado" },
    { label: "Empresa", value: "empresa" },
    { label: "Honorarios", value: "honorarios" },
    // { label: "Honorarios y suplidos", value: "honorariosYSuplidos" },
    { label: "Forma de pago", value: "formaDePago" },
    { label: "Facturado", value: "facturado" },
    { label: "Comprobado todo", value: "comprobadoTodo" },
  ],
  [UserRole.SuperAdmin]: [
    { label: "ID / Código Expediente", value: "autoincrementalId" },
    { label: "Colaborador", value: "colaborador" },
    { label: "Tipo", value: "tipo" },
    { label: "Vinculado", value: "vinculado" },
    { label: "Conectividad", value: "conexiones" },
    { label: "Observaciones", value: "observaciones" },
    { label: "Guardado en", value: "guardadoEn" },
    { label: "Responsable", value: "responsable" },
    { label: "Codigo cliente", value: "codigoCliente" },
    { label: "Codigo cliente provisional", value: "codigoClienteProvisional" },
    { label: "Cliente", value: "cliente" },
    { label: "Beneficiario", value: "beneficiario" },
    { label: "Asunto", value: "asunto" },
    {
      label: "Fecha solicitud",
      value: "fechaSolicitud",
    },
    {
      label: "Silencio administrativo",
      value: "silencioAdministrativo",
    },
    {
      label: "Fecha notificación",
      value: "fechaNotificacion",
    },
    { label: "Plazo legal", value: "plazoLegal" },
    { label: "Estado", value: "estado" },
    { label: "Empresa", value: "empresa" },
    { label: "Honorarios", value: "honorarios" },
    // { label: "Honorarios y suplidos", value: "honorariosYSuplidos" },
    { label: "Forma de pago", value: "formaDePago" },
    { label: "Facturado", value: "facturado" },
    { label: "Comprobado todo", value: "comprobadoTodo" },
  ],
};
