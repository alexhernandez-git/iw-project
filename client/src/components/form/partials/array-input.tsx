import React, { useState } from "react";
import Button from "../../button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";

type Props = {
  label: string;
  name: string;
};

type Input = {
  label: string;
  value: string;
};

const ArrayInput = ({ label, name, values, onChangeArrayInput }: Props) => {
  const formik = useFormik({
    initialValues: {
      labelInput: "",
      valueInput: "",
    },
    onSubmit: ({ labelInput, valueInput }, { resetForm }) => {
      onChangeArrayInput(...values, { label: labelInput, value: valueInput });
      resetForm();
    },
  });

  const [isAddingInput, setIsAddingInput] = useState<boolean>(false);

  const handleCloseAddingInput = () => {};

  const onDeleteInput = (label: string) => {
    setInputs((inputsState) =>
      inputsState.filter((inputItem) => inputItem.label !== label)
    );
  };

  console.log(inputs);

  return (
    <>
      {inputs.map(({ label, value }: Input) => (
        <>
          <div className="col-span-3 sm:col-span-3">
            <label
              htmlFor={label}
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              value={label}
              name={label}
              id={label}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="col-span-3 sm:col-span-3">
            <label
              htmlFor={value}
              className="block text-sm font-medium text-gray-700"
            >
              Valor
            </label>
            <input
              type="text"
              value={value}
              name={value}
              id={value}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </>
      ))}
      <>
        <div className="col-span-3 sm:col-span-3">
          <label
            htmlFor={"labelInput"}
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            value={formik.values.labelInput}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name={"labelInput"}
            id={label}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-3 sm:col-span-3">
          <label
            htmlFor={"valueInput"}
            className="block text-sm font-medium text-gray-700"
          >
            Valor
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
