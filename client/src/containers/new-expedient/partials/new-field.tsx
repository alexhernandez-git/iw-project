/* This example requires Tailwind CSS v2.0+ */
import { SetStateAction, useEffect, useRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/button";
import { RequerimientoDelExpedienteTipo, Type } from "../../../utils/types";
import { useFormik } from "formik";

const mailingLists = [
  {
    id: RequerimientoDelExpedienteTipo.Texto,
    title: "Texto",
    description: "Ej: Nombre, Apellidos...",
  },
  {
    id: RequerimientoDelExpedienteTipo.TextoLargo,
    title: "Texto Largo",
    description: "Ej: Descripciónes...",
  },
  {
    id: RequerimientoDelExpedienteTipo.Archivo,
    title: "Archivo",
    description: "Ej: Foto DNI, foto pasaporte...",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  isAddingNewField: boolean;
  setIsAddingNewField: SetStateAction<any>;
  onAddField: ({
    nombre,
    tipo,
    descripcion,
  }: {
    nombre: string;
    tipo: RequerimientoDelExpedienteTipo;
    descripcion?: string | boolean;
  }) => void;
};

export default function NewField({
  isAddingNewField,
  setIsAddingNewField,
  onAddField,
}: Props) {
  const [fieldType, setFieldType] = useState(mailingLists[0]);
  const tipo = useRef<RequerimientoDelExpedienteTipo>(mailingLists[0].id);
  console.log({ tipo });
  const formik = useFormik({
    initialValues: {
      nombre: "",
    },
    onSubmit: ({ nombre }) => {
      console.log({ nombre });
      onAddField({
        nombre,
        tipo: tipo.current,
      });
      setIsAddingNewField(false);
    },
  });
  return (
    <>
      <div className="mb-3">
        <span className="text-base font-medium text-gray-900">
          Elige el nombre del nuevo campo
        </span>
        <div className="mt-3">
          <div className="mt-1">
            <input
              type="text"
              name="nombre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
              id="nombre"
              placeholder="Ej: DNI, dirección, codigo postal..."
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            />
          </div>
        </div>
      </div>
      <RadioGroup
        value={fieldType}
        onChange={(value) => {
          setFieldType(value);
          tipo.current = value.id;
        }}
      >
        <RadioGroup.Label className="text-base font-medium text-gray-900">
          Selecciona el tipo del nuevo campo
        </RadioGroup.Label>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
          {mailingLists.map((mailingList) => (
            <RadioGroup.Option
              key={mailingList.id}
              value={mailingList}
              className={({ checked, active }) =>
                classNames(
                  checked ? "border-transparent" : "border-gray-300",
                  active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                  "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className="block text-sm font-medium text-gray-900"
                      >
                        {mailingList.title}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className="mt-1 flex items-center text-sm text-gray-500"
                      >
                        {mailingList.description}
                      </RadioGroup.Description>
                    </span>
                  </span>
                  <CheckCircleIcon
                    className={classNames(
                      !checked ? "invisible" : "",
                      "h-5 w-5 text-indigo-600"
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-indigo-500" : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-lg"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div className="mt-4">
        <Button
          onClick={() => setIsAddingNewField(false)}
          type={Type.Secondary}
          className="mr-2"
        >
          Cancelar
        </Button>
        <Button onClick={formik.handleSubmit}>Crear</Button>
      </div>
    </>
  );
}
