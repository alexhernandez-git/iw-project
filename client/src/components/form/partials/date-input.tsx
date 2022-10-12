import React from "react";

type Props = {
  label: string;
  name: string;
};

const DateInput = ({ label, name }: Props) => {
  return (
    <div className="col-span-6 sm:col-span-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="date"
        name={name}
        id={name}
        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default DateInput;
