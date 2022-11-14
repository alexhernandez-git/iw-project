import React from "react";

type Props = {
  label: string;
  name: string;
  formik: any;
};

const DateInput = ({
  label,
  name,
  formik: { values, handleChange, handleBlur },
}: Props) => {
  return (
    <div className="col-span-6 sm:col-span-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="date"
        name={name}
        id={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-esan-color focus:outline-none focus:ring-esan-color sm:text-sm"
      />
    </div>
  );
};

export default DateInput;
