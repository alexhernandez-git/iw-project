import { ExpedientState, HonorariosYSuplidosType } from "./types";

export const makeId = (length: number) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getHonorariosYSuplidosLabel = (tipo: HonorariosYSuplidosType) => {
  switch (tipo) {
    case HonorariosYSuplidosType.DenominacionSocial:
      return "Denominación social";
    case HonorariosYSuplidosType.Notaria:
      return "Notaria";
    case HonorariosYSuplidosType.RegistroMercantil:
      return "Registro Mercantil";
    case HonorariosYSuplidosType.Tasas:
      return "Tasas";
    default:
      return "No definido";
  }
};

export const getEstadoLabel = (estado: ExpedientState) => {
  switch (estado) {
    case ExpedientState.DocumentacionPendiente:
      return "DocumentacionPendiente";
    case ExpedientState.DocumentacionPendiente:
      return "Documentación pendiente";
    case ExpedientState.DocumentacionCompleta:
      return "Para cursar";
    case ExpedientState.ExpedientCursadoNoConcluido:
      return "Expediente cursado no concluido";
    case ExpedientState.NoResolucion:
      return "No resolución";
    case ExpedientState.ResolucionDeNegatoria:
      return "Resolución de negatoria";
    case ExpedientState.ResolucionFaborable:
      return "Resolución favorable";
    default:
      return "No definido";
  }
};
