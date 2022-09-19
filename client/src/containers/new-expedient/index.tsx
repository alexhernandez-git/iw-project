import Layout from "../../layouts/layout";
import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import Button from "../../components/button";
import StepLayout from "./partials/step-layout";
import FormSection from "../../components/form-section";

import { tipoDeExpedientes } from "../../data";
import {
  FormFileField,
  FormTextAreaField,
  FormTextField,
} from "../../components/form-field";
import { RequerimientoDelExpedienteTipo } from "../../utils/types";

const people = [
  { id: 1, name: "Leslie Alexander" },
  // More users...
];

// Pasos
// 1 - Datos cliente
// 2 - Tipo de expediente
// 3 - Datos de expediente

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const actions = [
  {
    icon: ClockIcon,
    name: "Extrangeria",
    descripcion:
      "Esta es una descripción de prueba para poner un poco de texto",
    href: "/new-expedient/1",
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    icon: CheckBadgeIcon,
    name: "Benefits",
    descripcion:
      "Esta es una descripción de prueba para poner un poco de texto",
    href: "/new-expedient/1",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    icon: UsersIcon,
    name: "Schedule a one-on-one",
    descripcion:
      "Esta es una descripción de prueba para poner un poco de texto",
    href: "/new-expedient/1",
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    icon: BanknotesIcon,
    name: "Payroll",
    descripcion:
      "Esta es una descripción de prueba para poner un poco de texto",
    href: "/new-expedient/1",
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    icon: ReceiptRefundIcon,
    name: "Submit an expense",
    descripcion:
      "Esta es una descripción de prueba para poner un poco de texto",
    href: "/new-expedient/1",
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    icon: AcademicCapIcon,
    name: "Training",
    descripcion:
      "Esta es una descripción de prueba para poner un poco de texto",
    href: "/new-expedient/1",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];

const expediente = tipoDeExpedientes[0];

export default function NewExpedientType() {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [step, setStep] = useState(0);

  const onNextStep = () => {
    setStep(step < 1 ? step + 1 : step);
  };

  const filteredActions =
    query === ""
      ? actions
      : actions.filter((action) => {
          return action.name.toLowerCase().includes(query.toLowerCase());
        });

  const SeccondStep = useMemo(
    () => (
      <div className="text-black">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <FormSection>
              <div className="space-y-6 sm:space-y-5">
                {expediente?.requerimientos.map((requerimiento) => {
                  switch (requerimiento.tipo) {
                    case RequerimientoDelExpedienteTipo.Texto:
                      return <FormTextField requirement={requerimiento} />;
                    case RequerimientoDelExpedienteTipo.TextoLargo:
                      return <FormTextAreaField requirement={requerimiento} />;
                    case RequerimientoDelExpedienteTipo.Archivo:
                      return <FormFileField requirement={requerimiento} />;
                    default:
                      return <FormTextField requirement={requerimiento} />;
                  }
                })}
              </div>
            </FormSection>
          </div>
        </form>
      </div>
    ),
    []
  );

  const getTextButton = useMemo(
    () => (step === 0 ? "Continuar" : "Crear"),
    [step]
  );

  return (
    <Layout title={"Creación del expediente"}>
      {/* Actions panel */}
      <StepLayout
        onNextStep={onNextStep}
        textButton={getTextButton}
        disabledButton={!selectedType}
      >
        <Combobox as="div" value={selectedType} onChange={setSelectedType}>
          <Combobox.Label className="block text-md font-medium text-gray-700">
            Elige el tipo de expediente
          </Combobox.Label>
          <div className="relative mt-3">
            <Combobox.Input
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(action) => action?.name}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>

            {filteredActions.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredActions.map((action) => (
                  <Combobox.Option
                    key={action.name}
                    value={action}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <span
                          className={classNames(
                            "block truncate",
                            selected && "font-semibold"
                          )}
                        >
                          {action.name}
                        </span>

                        {selected && (
                          <span
                            className={classNames(
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                              active ? "text-white" : "text-indigo-600"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>
        {step > 0 && SeccondStep}
      </StepLayout>
    </Layout>
  );
}
