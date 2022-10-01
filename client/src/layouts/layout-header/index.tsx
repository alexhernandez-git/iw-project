import React from "react";

type Props = {
  title: string;
  button?: {
    label: string;
    onClick: (_: any) => any;
  };
};

const LayoutHeader = ({ title, button = null }: Props) => {
  return (
    /* This example requires Tailwind CSS v2.0+ */
    <div className="border-b border-gray-200 p-5 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-md font-medium leading-6 text-gray-600">{title}</h3>
      {button && (
        <div className="mt-3 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={button.onClick}
            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {button.label}
          </button>
        </div>
      )}
    </div>
  );
};

export default LayoutHeader;
