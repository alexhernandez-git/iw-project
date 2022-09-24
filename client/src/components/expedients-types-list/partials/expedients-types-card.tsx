import React from "react";
/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const ExpedientsTypesCard = ({ expedient }) => {
  return (
    <li key={expedient.id}>
      <Link to="/expedients-types/view" className="block hover:bg-gray-50">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="truncate">
              <div className="flex text-sm">
                <p className="truncate font-medium text-indigo-600">
                  {expedient.title}
                </p>
                <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                  in {expedient.department}
                </p>
              </div>
              <div className="mt-2 flex">
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>
                    Created on{" "}
                    <time dateTime={expedient.closeDate}>
                      {expedient.closeDateFull}
                    </time>
                  </p>
                </div>
              </div>
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
