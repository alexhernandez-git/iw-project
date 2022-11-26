import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const SectionLayout = ({ children, title }: Props) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-md font-medium leading-6 text-gray-600">{title}</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};
export default SectionLayout;
