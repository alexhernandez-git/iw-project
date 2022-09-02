import React, { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const DashboardTitleLayout = ({ title, children }: Props) => {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>
    </div>
  );
};

export default DashboardTitleLayout;
