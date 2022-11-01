import { useFormik } from "formik";
import React, { useState } from "react";
import Button from "../button";

type Props = {
  title: string;
  children: React.ReactNode;
  onEditSection: (sectionName: string, nombre: string) => void;
  onDeleteSection: (nombre: string) => void;
};

const FormSection = ({
  title,
  onDeleteSection,
  onEditSection,
  children,
}: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  const formik = useFormik({
    initialValues: {
      nombre: title,
    },
    onSubmit: (data) => {
      onEditSection(title, data.nombre);
      setIsEdit(false);
    },
  });

  return (
    <div className="space-y-6 pt-6 sm:space-y-5 sm:pt-6">
      {isEdit ? (
        <div className="flex justify-between">
          <input
            type="text"
            name="nombre"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nombre}
            id="nombre"
            placeholder=""
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
          />
          <Button onClick={formik.handleSubmit}>Guardar</Button>
        </div>
      ) : (
        <div className="flex justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
          {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Requierimientos del expediente
        </p> */}
          <div className="flex gap-3">
            <span onClick={() => setIsEdit(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </span>
            <span onClick={() => onDeleteSection(title)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
          </div>
        </div>
      )}

      <div className="space-y-6 sm:space-y-5">{children}</div>
    </div>
  );
};

export default FormSection;
