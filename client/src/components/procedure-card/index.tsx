import React from "react";
import { BanknotesIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type Props = {
  procedure: any;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProcedureCard = ({ procedure }: Props) => {
  return (
    <tr key={procedure.id} className="bg-white">
      <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
        <div className="flex">
          <a
            href={procedure.href}
            className="group inline-flex space-x-2 truncate text-sm"
          >
            <BanknotesIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <p className="truncate text-gray-500 group-hover:text-gray-900">
              {procedure.name}
            </p>
          </a>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
        <span className="font-medium text-gray-900">{procedure.amount}</span>
        {procedure.currency}
      </td>
      <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
        <span
          className={classNames(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
          )}
        >
          {procedure.status}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
        <time dateTime={procedure.datetime}>{procedure.date}</time>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
      </td>
    </tr>
  );
};

const ProcedureCardSmall = ({ procedure }: Props) => {
  return (
    <li key={procedure.id}>
      <a
        href={procedure.href}
        className="block bg-white px-4 py-4 hover:bg-gray-50"
      >
        <span className="flex items-center space-x-4">
          <span className="flex flex-1 space-x-2 truncate">
            <BanknotesIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <span className="flex flex-col truncate text-sm text-gray-500">
              <span className="truncate">{procedure.name}</span>
              <span>
                <span className="font-medium text-gray-900">
                  {procedure.amount}
                </span>{" "}
                {procedure.currency}
              </span>
              <time dateTime={procedure.datetime}>{procedure.date}</time>
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
export default ProcedureCard;
export { ProcedureCardSmall };
