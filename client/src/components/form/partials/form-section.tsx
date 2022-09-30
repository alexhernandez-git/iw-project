import React from "react";
import { FormInput, FormInputType } from "../../../utils/types";
import SelectInput from "./select-input";
import TextInput from "./text-input";

type Props = {
  label: string;
  description: string;
  inputs: FormInput[];
  onSave?: (_: any) => any | null;
};

const FormSection = ({ label, description, inputs, onSave = null }: Props) => {
  return (
    <div className="shadow sm:overflow-hidden sm:rounded-md">
      <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {label}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <div className="grid grid-cols-6 gap-6">
          {inputs.map(({ name, type, label }: FormInput) => {
            switch (type) {
              case FormInputType.Text:
                return <TextInput {...{ label, name }} />;
              case FormInputType.Select:
                return <SelectInput {...{ label, name }} />;
              default:
                break;
            }
          })}
        </div>
      </div>
      {onSave && (
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default FormSection;
