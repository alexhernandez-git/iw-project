import React, { ReactElement } from "react";
import { FormInput } from "../../utils/types";
import FormSection from "./partials/form-section";

type Props = {
  customSection: React.ReactElement;
  children: ReactElement;
  onSubmit: (_: any) => any;
  data: {
    label: string;
    description: string;
    inputs: FormInput[];
    formik: any;
    onSave?: (_: any) => any | null;
  }[];
};

const Form = ({ data, children, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} method="POST" className="space-y-6 mb-5">
      {data.map((section) => (
        <FormSection {...section} />
      ))}
      <div className="shadow sm:rounded-md">{children}</div>
    </form>
  );
};

export default Form;
