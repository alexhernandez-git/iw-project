import React from "react";
/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const ExpedientsTypesCard = ({ expedientType }) => {
  return (
    <li key={expedientType.id}>
      <Link
        to={`/expedients-types/${expedientType._id}`}
        className="block hover:bg-gray-50"
      >
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="truncate flex justify-between items-center flex-1">
              <div className="text-sm">
                <p className="truncate font-medium text-esan-color">
                  {expedientType.nombre}
                </p>
                <p className="text-xs text-gray-600">{expedientType.codigo}</p>
              </div>
              {expedientType.honorarios && (
                <span>
                  <p className="text-xs text-gray-600">
                    {expedientType.honorarios + "€"}
                  </p>
                </span>
              )}
            </div>
          </div>
          <div className="ml-5 flex-shrink-0">
            <ChevronRightIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ExpedientsTypesCard;
