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
  console.log(estado);
  switch (estado) {
    case ExpedientState.DocumentacionPendiente:
      return (
        <span className="bg-gray-200 py-1 px-2 rounded-full">Pendiente</span>
      );
    case ExpedientState.DocumentacionCompleta:
      return (
        <span className="bg-green-200 py-1 px-2 rounded-full">Para cursar</span>
      );
    case ExpedientState.Concluido:
      return (
        <span className="bg-yellow-200 py-1 px-2 rounded-full">Concluido</span>
      );
    case ExpedientState.ExpedientCursadoNoConcluido:
      return (
        <span className="bg-blue-200 py-1 px-2 rounded-full">
          Cursado no concluido
        </span>
      );
    case ExpedientState.NoResolucion:
      return (
        <span className="bg-gray-200 py-1 px-2 rounded-full">
          No resolución
        </span>
      );
    case ExpedientState.ResolucionDeNegatoria:
      return (
        <span className="bg-red-200 py-1 px-2 rounded-full">
          Resolución denegatoria
        </span>
      );
    case ExpedientState.ResolucionFaborable:
      return (
        <span className="bg-purple-200 py-1 px-2 rounded-full">
          Resolución favorable
        </span>
      );
    default:
      return (
        <span className="bg-orange-200 py-1 px-2 rounded-full">
          No definido
        </span>
      );
  }
};

export const downloadFiles = (filePath: string) => {
  var a = document.createElement("A");
  a.href = filePath;
  a.download = filePath.substr(filePath.lastIndexOf("/") + 1);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export async function downloadUsingFetch(filePath: string) {
  const image = await fetch(filePath);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const anchor = document.createElement("a");
  anchor.href = imageURL;
  anchor.download = filePath;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
