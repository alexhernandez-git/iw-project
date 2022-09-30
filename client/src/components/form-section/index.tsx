import React from "react";

type Props = {
  children: React.ReactNode;
};

const FormSection = ({ children }: Props) => {
  return (
    <div className="space-y-6 pt-6 sm:space-y-5 sm:pt-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Requerimientos
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Requierimientos del expediente
        </p>
      </div>
      <div className="space-y-6 sm:space-y-5">{children}</div>
    </div>
  );
};

export default FormSection;
