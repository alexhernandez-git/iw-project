import React, { useMemo, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  label: string;
  name: string;
  formik: any;
};

const SelectInput = ({ label, options, name, formik }: Props) => {
  const [query, setQuery] = useState("");

  const [optionsValues, setOptionsValues] = useState(
    formik.values[name] ?? "-"
  );

  const allOptions = useMemo(
    () => [{ id: "-", label: "-" }, ...options],
    [options]
  );

  const onChange = (value: string) => {
    const selectedOption = options.find(
      (optionItem) => optionItem.label === value
    );
    console.log("entra", selectedOption?.id);
    formik.setFieldValue(name, selectedOption?.id ?? null);
    setOptionsValues(value);
  };

  const optionsValuesFiltered =
    query === ""
      ? allOptions
      : allOptions.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="col-span-6 sm:col-span-3">
      <Combobox as="div" value={optionsValues} onChange={onChange}>
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          {label}
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(option: string) => option}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {optionsValuesFiltered?.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {optionsValuesFiltered.map((option) => (
                <Combobox.Option
                  key={option.id}
                  value={option.label}
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
                        {option.label}
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
    </div>
  );
};

export default SelectInput;
