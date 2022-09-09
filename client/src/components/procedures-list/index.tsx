import React from "react";
import ProcedureCard, { ProcedureCardSmall } from "../procedure-card";
import { Procedure } from "../../utils/types";

type Props = {
  procedures: Procedure[];
};

const ProceduresList = ({ procedures }: Props) => {
  return (
    <div className="hidden sm:block">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-2 flex flex-col">
          <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Transaction
                  </th>
                  <th
                    className="bg-gray-50 px-6 py-3  text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Amount
                  </th>
                  <th
                    className="hidden bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-900 md:block"
                    scope="col"
                  >
                    Status
                  </th>
                  <th
                    className="bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-900"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {procedures.map((procedure, index) => (
                  <ProcedureCard procedure={procedure} key={index} />
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <nav
              className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">20</span> results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProceduresListSmall = ({ procedures }: Props) => {
  return (
    <div className="shadow sm:hidden">
      <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
        {procedures.map((procedure, index) => (
          <ProcedureCardSmall procedure={procedure} key={index} />
        ))}
      </ul>

      <nav
        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
        aria-label="Pagination"
      >
        <div className="flex flex-1 justify-between">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Next
          </a>
        </div>
      </nav>
    </div>
  );
};

export { ProceduresListSmall };
export default ProceduresList;
