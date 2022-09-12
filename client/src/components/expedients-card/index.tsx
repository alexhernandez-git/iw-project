import React from "react";
import { BanknotesIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Expediente } from "../../utils/types";

type Props = {
  expedient: Expediente;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ExpedientCard = ({ expedient }: Props) => {
  return (
    <tr key={expedient?.expediente} className="bg-white">
      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
        {expedient?.empresa}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
        {expedient?.tipo}
      </td>
      <td className="hidden whitespace-nowrap px-6 text-center py-4 text-sm text-gray-500 md:block">
        <span
          className={classNames(
            "inline-flex items-center px-2.5 py-0.5 text-center rounded-full text-xs font-medium capitalize"
          )}
        >
          {expedient?.estado}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
        <span
          className={classNames(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
          )}
        >
          {expedient?.expediente}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
        <span
          className={classNames(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
          )}
        >
          {expedient?.honorarios}€
        </span>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
      </td>
    </tr>
  );
};

const ExpedientCardSmall = ({ expedient }: Props) => {
  return (
    // <li key={expedient?.id}>
    //   <a
    //     href={expedient?.href}
    //     className="block bg-white px-4 py-4 hover:bg-gray-50"
    //   >
    //     <span className="flex items-center space-x-4">
    //       <span className="flex flex-1 space-x-2 truncate">
    //         <BanknotesIcon
    //           className="h-5 w-5 flex-shrink-0 text-gray-400"
    //           aria-hidden="true"
    //         />
    //         <span className="flex flex-col truncate text-sm text-gray-500">
    //           <span className="truncate">{expedient?.name}</span>
    //           <span>
    //             <span className="font-medium text-gray-900">
    //               {expedient?.amount}
    //             </span>{" "}
    //             {expedient?.currency}
    //           </span>
    //           <time dateTime={expedient?.datetime}>{expedient?.date}</time>
    //         </span>
    //       </span>
    //       <ChevronRightIcon
    //         className="h-5 w-5 flex-shrink-0 text-gray-400"
    //         aria-hidden="true"
    //       />
    //     </span>
    //   </a>
    // </li>
    <></>
  );
};
export default ExpedientCard;
export { ExpedientCardSmall };
