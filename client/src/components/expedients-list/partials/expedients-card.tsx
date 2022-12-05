import React from "react";
import { BanknotesIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Expediente } from "../../../utils/types";
import { Link } from "react-router-dom";
import moment from "moment";

type Props = {
  expedient: Expediente;
  selectedFields: { label: string; value: string }[];
};

const ExpedientCard = ({ expedient, selectedFields }: Props) => {
  return (
    <tr key={expedient._id} className="bg-white">
      {selectedFields.map((selectedField: { label: string; value: string }) => (
        <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
          {selectedField === "vinculado"
            ? expedient[selectedField]?._id
            : selectedField === "tipo"
            ? expedient[selectedField]?.nombre
            : selectedField === "fechaSolicitudServicioNotificacion"
            ? moment(expedient[selectedField]).format("D-M-yyyy")
            : selectedField === "plazoLegal"
            ? moment(expedient[selectedField]).format("D-M-yyyy")
            : selectedField === "silencioAdministrativo"
            ? moment(expedient[selectedField]).format("D-M-yyyy")
            : selectedField === "fechaNotificacion"
            ? moment(expedient[selectedField]).format("D-M-yyyy")
            : expedient[selectedField]}
        </td>
      ))}
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link
          to={`/expedients/${expedient._id}`}
          className="text-esan-color hover:text-indigo-900"
        >
          Ver
        </Link>
      </td>
    </tr>
  );
};

const ExpedientCardSmall = ({ expedient }: Props) => {
  return (
    <li key={expedient._id}>
      <a href={""} className="block bg-white px-4 py-4 hover:bg-gray-50">
        <span className="flex items-center space-x-4">
          <span className="flex flex-1 space-x-2 truncate">
            <BanknotesIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <span className="flex flex-col truncate text-sm text-gray-500">
              <span className="truncate">{expedient.tipo.nombre}</span>
              <span>
                <span className="font-medium text-gray-900">
                  {expedient.honorarios}€
                </span>{" "}
                {expedient.empresa}
              </span>
            </span>
          </span>
          <ChevronRightIcon
            className="h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </a>
    </li>
  );
};
export default ExpedientCard;
export { ExpedientCardSmall };
