import { ReactNode } from "react";
import { Type } from "../../utils/types";
import Button from "../button";

type Props = {
  title?: string | null;
  children: ReactNode;
  button?: {
    label: string;
    onClick: (_: any) => any;
  } | null;
};

const SectionLayout = ({ children, title, button }: Props) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        {title && (
          <h3 className="text-md font-medium leading-6 text-gray-600">
            {title}
          </h3>
        )}
        {button && (
          <Button type={Type.Secondary} onClick={button.onClick}>
            {button.label}
          </Button>
        )}
      </div>
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};
export default SectionLayout;
