import React from "react";

const CheckboxInput = ({
  label,
  name,
  formik: { values, handleChange, handleBlur },
}) => {
  return (
    <div className="col-span-6 sm:col-span-4">
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            aria-describedby="comments-description"
            name={name}
            id={name}
            checked={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={name} className="font-medium text-gray-700">
            {label}
          </label>
        </div>
      </div>
    </div>
  );
};

export default CheckboxInput;
