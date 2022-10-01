/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import LayoutHeader from "../layout-header";
import Filters from "../../components/filters";

type Props = {
  children: ReactNode;
  title?: string | null;
  filters?: any;
  button?: {
    label: string;
    onClick: (_: any) => any;
  };
  search?: {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
  };
};

export default function Layout({
  children,
  title = null,
  filters = null,
  button = null,
  search = undefined,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarProps = {
    sidebarOpen,
    setSidebarOpen,
  };

  const headerProps = {
    setSidebarOpen,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar {...sidebarProps} />
      <div className="flex flex-1 flex-col md:pl-64">
        <Header {...headerProps} search={search} />

        <main className="flex-1">
          {title ? (
            <div>
              <LayoutHeader title={title} button={button} />
              {filters && <Filters />}
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-6">
                {children}
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
