import React from "react";
import ExpedientsList from "../../components/expedients-list";
import DashboardLayout from "../../layouts/layout";
import { expedients } from "../../data";
import { useSearch } from "../../hooks/use-search";

const Expedients = () => {
  const [search, setSearch] = useSearch({
    callback: (searchValue) => {
      console.log("text-changed expedients", searchValue);
    },
  });
  return (
    <DashboardLayout
      title={"Expedients"}
      filters={{}}
      search={{ search, setSearch }}
      pages={[
        {
          name: "Expedientes",
          href: "/expedients",
          current: true,
        },
      ]}
    >
      <ExpedientsList {...{ expedients }} />
    </DashboardLayout>
  );
};

export default Expedients;
