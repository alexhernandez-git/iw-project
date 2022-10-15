import React from "react";

const TextInput = ({ label, name, formik }) => {
  return (
    <div className="col-span-6 sm:col-span-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default TextInput;
