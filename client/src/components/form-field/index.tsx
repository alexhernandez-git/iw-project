import React, { useEffect, useRef, useState } from "react";
import { FieldData } from "../../utils/types";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import Button from "../button";

type Props = {
  data: FieldData;
};

const FormFieldLayout = ({
  data: {
    nombre,
    descripcion,
    custom,
    onDeleteField,
    onEditFieldLabel,
    editable,
  },
  children,
}: {
  data: FieldData;
  children: React.ReactNode;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const formik = useFormik({
    initialValues: {
      nombre,
    },
    onSubmit: (data) => {
      onEditFieldLabel(nombre, data.nombre);
      setIsEdit(false);
    },
  });

  const inputRef = useRef();

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);
  return (
    <div className="sm:border-t sm:border-gray-200  sm:pt-5">
      {(custom || editable) && (
        <div className="flex justify-end">
          {isEdit ? (
            <div>
              <Button onClick={formik.handleSubmit}>Guardar</Button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-esan-color focus:ring-offset-2"
              >
                <span className="sr-only">Close panel</span>
                <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onDeleteField(nombre)}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-esan-color focus:ring-offset-2"
              >
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      )}
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 mt-3">
        {isEdit ? (
          <input
            type="text"
            name="nombre"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            ref={inputRef}
            value={formik.values.nombre}
            id="nombre"
            placeholder=""
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-esan-color focus:ring-esan-color sm:max-w-xs sm:text-sm"
          />
        ) : (
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            {nombre}
          </label>
        )}
        <div className="mt-1 sm:col-span-2 sm:mt-0">{children}</div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{descripcion}</p>
    </div>
  );
};

export const FormTextField = ({ data }: Props) => {
  const { disabled, nombre, onEditField, getFieldValue } = data;
  return (
    <FormFieldLayout data={data}>
      <input
        type="text"
        disabled={disabled}
        name={nombre}
        value={getFieldValue(nombre)}
        onChange={(e: { target: { value: string } }) =>
          onEditField && onEditField(nombre, e.target.value)
        }
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-esan-color focus:ring-esan-color sm:max-w-xs sm:text-sm"
      />
    </FormFieldLayout>
  );
};

export const FormTextAreaField = ({ data }: Props) => {
  const { disabled, nombre, id, onEditField, getFieldValue } = data;

  return (
    <FormFieldLayout data={data}>
      <textarea
        id="about"
        disabled={disabled}
        rows={3}
        name={nombre}
        value={getFieldValue(nombre)}
        onChange={(e: { target: { value: string } }) =>
          onEditField && onEditField(nombre, e.target.value)
        }
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-esan-color focus:ring-esan-color sm:text-sm"
        defaultValue={""}
      />
    </FormFieldLayout>
  );
};

export const FormFileField = ({ data }: Props) => {
  const {
    disabled,
    nombre,
    onEditFileField,
    getFieldFiles,
    onEditFile,
    getNotUploadedFieldFiles,
  } = data;

  return (
    <FormFieldLayout data={data}>
      <label
        htmlFor={nombre}
        className={`flex cursor-pointer justify-center rounded-md`}
      >
        <div className="space-y-1 text-center flex flex-col items-center">
          <div className="flex text-sm text-gray-600">
            <span className="relative cursor-pointer rounded-md bg-white font-medium text-esan-color focus-within:outline-none focus-within:ring-2 focus-within:ring-esan-color focus-within:ring-offset-2 hover:text-esan-color">
              <input
                disabled={disabled}
                onChange={(e) => {
                  console.log({ onEditFile });
                  onEditFile(nombre, e.target.files?.[0]);
                  onEditFileField(nombre, e.target.files);
                }}
                id={nombre}
                name={nombre}
                type="file"
              />
            </span>

            {/* <p className="pl-1">or drag and drop</p> */}
          </div>
          {/* <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p> */}
        </div>
      </label>
      <div className="flex justify-center">
        {getNotUploadedFieldFiles(nombre).length === 0 &&
          getFieldFiles(nombre).map((archivo) => (
            <span className="inline-flex items-center mt-2 rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-800">
              {archivo.split("]-[")[1]}
            </span>
          ))}
        {/* {getNotUploadedFieldFiles(nombre).map((archivo: string) => (
          <span className="inline-flex items-center mt-2 rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-800">
            {archivo}
          </span>
        ))} */}
      </div>
    </FormFieldLayout>
  );
};
