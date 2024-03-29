import React, { ReactElement, useState } from "react";
import ExpedientCard, { ExpedientCardSmall } from "./partials/expedients-card";
import { Expedient } from "../../utils/types";
import TableFilter from "./partials/table-filter";
import { useAppDispatch, useAppSelector } from "../../store";
import { listFields } from "../../data";
import { update } from "../../store/user";

type Props = {
  expedients: Expedient[];
  vinculados: Expedient[];
  pagination: ReactElement<any, any>;
  home: boolean;
};

const ExpedientsList = ({
  expedients,
  vinculados,
  pagination,
  home = false,
}: Props) => {
  const [open, setOpen] = useState(false);

  const { value: user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const { expedientsTableFields, _id } = user;

  console.log({ vinculados });

  const handleUpdateExpedientsTableFields = (fields: string[]) => {
    dispatch(
      update({
        id: _id,
        user: {
          expedientsTableFields: fields,
        },
      })
    );
  };

  return (
    <div className="block">
      <TableFilter
        {...{
          open,
          setOpen,
          expedientsTableFields,
          handleUpdateExpedientsTableFields,
        }}
      />
      {!home && (
        <div className="flex justify-end my-2">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center text-gray-600 text-sm"
          >
            Editar tabla
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            </svg>
          </button>
        </div>
      )}
      <div className="px-4 sm:px-6 lg:px-8 mb-10">
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      {expedientsTableFields
                        .filter((field) => field !== "_id")
                        .map((selectedField) => (
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                          >
                            {user?.role &&
                              listFields[user?.role].find(
                                (field) => field.value === selectedField
                              )?.label}
                          </th>
                        ))}

                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {expedients &&
                      expedients.map((expedient, index) => (
                        <>
                          <ExpedientCard
                            expedient={expedient}
                            key={index}
                            selectedFields={expedientsTableFields}
                          />
                          {vinculados
                            .filter(
                              (vinculado) =>
                                vinculado.vinculado._id === expedient._id
                            )
                            .map((vinculado) => (
                              <>
                                <tr
                                  key={expedient._id}
                                  className={"bg-gray-200"}
                                >
                                  <td
                                    colSpan={expedientsTableFields.length + 1}
                                  >
                                    <span className="text-sm text-gray-600 px-6">
                                      Vinculado
                                    </span>
                                  </td>
                                </tr>
                                <ExpedientCard
                                  expedient={vinculado}
                                  key={index}
                                  vinculado
                                  selectedFields={expedientsTableFields}
                                />
                              </>
                            ))}
                        </>
                      ))}
                  </tbody>
                </table>
                {pagination && pagination}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExpedientsList;
