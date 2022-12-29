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
      return "Pendiente";
    case ExpedientState.DocumentacionCompleta:
      return "Para cursar";
    case ExpedientState.Concluido:
      return "Concluido";
    case ExpedientState.ExpedientCursadoNoConcluido:
      return "Cursado no concluido";
    case ExpedientState.NoResolucion:
      return "No resolución";
    case ExpedientState.ResolucionDeNegatoria:
      return "Resolución denegatoria";
    case ExpedientState.ResolucionFaborable:
      return "Resolución favorable";
    default:
      return "No definido";
  }
};

export const downloadFiles = (filePath: string) => {
  var link = document.createElement("a");
  link.href = filePath;
  link.target = "_blank";
  link.download = filePath.substr(filePath.lastIndexOf("/") + 1);
  link.click();
};
