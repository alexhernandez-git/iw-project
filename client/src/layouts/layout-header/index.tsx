import React from "react";
import Button from "../../components/button";
import { Type } from "../../utils/types";

type Props = {
  title: string;
  button?: {
    label: string;
    onClick: (_: any) => any;
  };
  buttonSecondary?: {
    label: string;
    onClick: (_: any) => any;
  };
};

const LayoutHeader = ({
  title,
  button = null,
  buttonSecondary = null,
}: Props) => {
  return (
    /* This example requires Tailwind CSS v2.0+ */
    <div className="border-b border-gray-200 p-5 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-md font-medium leading-6 text-gray-600">{title}</h3>
      <div className="flex">
        {buttonSecondary && (
          <div className="mt-3 flex sm:mt-0 sm:ml-4">
            <Button onClick={buttonSecondary.onClick} type={Type.Secondary}>
              {buttonSecondary.label}
            </Button>
          </div>
        )}
        {button && (
          <div className="mt-3 flex sm:mt-0 sm:ml-4">
            <Button onClick={button.onClick}>{button.label}</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutHeader;
