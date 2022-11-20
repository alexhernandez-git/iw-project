import React from "react";
import { FormInput, FormInputType } from "../../../utils/types";
import ArrayInput from "./array-input";
import CheckboxInput from "./checkbox-input";
import DateInput from "./date-input";
import SelectInput from "./select-input";
import TextInput from "./text-input";

type Props = {
  label: string;
  description: string;
  inputs: FormInput[];
  formik: any;
  onSave?: (_: any) => any | null;
};

const FormSection = ({ label, description, inputs, onSave = null }: Props) => {
  return (
    <div className="shadow sm:rounded-md">
      <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {label}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <div className="grid grid-cols-6 gap-6">
          {inputs.map(({ name, type, label, options, formik }: FormInput) => {
            switch (type) {
              case FormInputType.Text:
                return <TextInput {...{ label, name, formik }} />;
              case FormInputType.Select:
                return <SelectInput {...{ label, name, options, formik }} />;
              case FormInputType.Date:
                return <DateInput {...{ label, name, options, formik }} />;
              case FormInputType.Array:
                return <ArrayInput {...{ label, name, formik }} />;
              case FormInputType.Checkbox:
                return <CheckboxInput {...{ label, name, formik }} />;
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
            className="inline-flex justify-center rounded-md border border-transparent bg-esan-color py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-esan-color focus:outline-none focus:ring-2 focus:ring-esan-color focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default FormSection;
