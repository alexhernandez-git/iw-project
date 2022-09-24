import React from "react";
import { Type } from "../../../utils/types";

type Props = {
  label: string;
  children: React.ReactNode;
  type: Type;
};

const DescriptionRow = ({ label, children, type }: Props) => {
  return (
    <div
      className={`${
        type === Type.Primary ? "bg-gray-50" : "bg-white"
      } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
    >
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {children}
      </dd>
    </div>
  );
};

export default DescriptionRow;
