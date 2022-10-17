import React from "react";
import Button from "../../button";
import { useFormik } from "formik";
import { HonorariosYSuplidosType } from "../../../utils/types";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  label: string;
  name: string;
  formik: any;
};

type Input = {
  tipo: HonorariosYSuplidosType;
  cantidad: string;
};

const ArrayInput = ({ label, name, formik: formFormik }: Props) => {
  const formik = useFormik({
    initialValues: {
      labelInput: "",
      valueInput: "",
    },
    onSubmit: ({ labelInput, valueInput }, { resetForm }) => {
      formFormik.setFieldValue(name, [
        ...formFormik.values[name],
        {
          tipo: labelInput,
          cantidad: valueInput,
        },
      ]);
      resetForm();
    },
  });

  const onEditInput = ({
    index,
    tipo,
    cantidad,
  }: {
    index: number;
    tipo: string;
    cantidad: string;
  }) => {
    formFormik.setFieldValue(
      name,
      formFormik.values[name].map(
        (value: { tipo: string; cantidad: number }, i: number) =>
          i === index ? { tipo, cantidad } : value
      )
    );
  };

  const onDeleteInput = (index: number) => {
    formFormik.setFieldValue(
      name,
      formFormik.values[name].filter(
        (_: { tipo: string; cantidad: number }, i: number) => i !== index
      )
    );
  };

  console.log(formFormik.values);

  return (
    <>
      {formFormik.values[name].map(
        ({ tipo, cantidad }: Input, index: number) => (
          <>
            <div className="col-span-6 sm:col-span-6">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onDeleteInput(index)}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor={tipo + index}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tipo
                  </label>
                  <select
                    value={tipo}
                    name={"Cantidad"}
                    onChange={(e) =>
                      onEditInput({ index, tipo: e.target.value, cantidad })
                    }
                    id={tipo + index}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="" label="Selecciona un tipo">
                      Selecciona un tipo{" "}
                    </option>
                    <option
                      value={HonorariosYSuplidosType.DenominacionSocial}
                      label={"Denominación Social"}
                    >
                      Denominación Social
                    </option>
                    <option
                      value={HonorariosYSuplidosType.RegistroMercantil}
                      label={"Registro Mercantil"}
                    >
                      Registro Mercantil
                    </option>
                    <option
                      value={HonorariosYSuplidosType.Notaria}
                      label={"Notaria"}
                    >
                      Notaria
                    </option>
                    <option
                      value={HonorariosYSuplidosType.Tasas}
                      label={"Tasas"}
                    >
                      Tasas
                    </option>
                  </select>
                </div>
                <div className="col-span-3 sm:col-span-3">
                  <label
                    id={cantidad + index}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cantidad
                  </label>
                  <input
                    type="text"
                    name={cantidad}
                    value={cantidad}
                    onChange={(e) =>
                      onEditInput({ index, cantidad: e.target.value, tipo })
                    }
                    id={cantidad + index}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </>
        )
      )}
      <>
        <div className="col-span-3 sm:col-span-3">
          <label
            htmlFor={"labelInput"}
            className="block text-sm font-medium text-gray-700"
          >
            Tipo
          </label>
          <select
            value={formik.values.labelInput}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name={"labelInput"}
            id={label}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="" label="Selecciona un tipo">
              Selecciona un tipo{" "}
            </option>
            <option
              value={HonorariosYSuplidosType.DenominacionSocial}
              label={"Denominación Social"}
            >
              Denominación Social
            </option>
            <option
              value={HonorariosYSuplidosType.RegistroMercantil}
              label={"Registro Mercantil"}
            >
              Registro Mercantil
            </option>
            <option value={HonorariosYSuplidosType.Notaria} label={"Notaria"}>
              Notaria
            </option>
            <option value={HonorariosYSuplidosType.Tasas} label={"Tasas"}>
              Tasas
            </option>
          </select>
        </div>
        <div className="col-span-3 sm:col-span-3">
          <label
            htmlFor={"valueInput"}
            className="block text-sm font-medium text-gray-700"
          >
            Cantidad
          </label>
          <input
            type="text"
            value={formik.values.valueInput}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name={"valueInput"}
            id={"valueInput"}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </>
      <div className="col-span-6 sm:col-span-4">
        <Button onClick={formik.handleSubmit}>Add value</Button>
      </div>
    </>
  );
};

export default ArrayInput;
