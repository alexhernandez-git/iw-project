import React, { useState } from "react";
import { FormInput } from "../../utils/types";
import FormSection from "./partials/form-section";

type Props = {
  onSubmit: (_: any) => any;
  customSection: React.ReactElement;
  data: {
    label: string;
    description: string;
    inputs: FormInput[];
    onSave?: (_: any) => any | null;
  }[];
};

const Form = ({ data, customSection, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} method="POST" className="space-y-6">
      {data.map((section) => (
        <FormSection {...section} />
      ))}
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white px-4 sm:px-6">{customSection}</div>
      </div>
    </form>
  );
};

export default Form;
