import React from "react";
import ExpedientsTypesList from "../../components/expedients-types-list";
import DashboardLayout from "../../layouts/layout";
import { expedientTypes } from "../../data";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/use-search";

const ExpedientsTypes = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearch({
    callback: (searchValue) => {
      console.log("text-changed expedients types", searchValue);
    },
  });
  return (
    <DashboardLayout
      title={"Tipos de expediente"}
      button={{
        label: "Crear",
        onClick: () => navigate("/expedients-types/new"),
      }}
      pages={[
        {
          name: "Tipos de expediente",
          href: "/expedients-types",
          current: true,
        },
      ]}
      search={{ search, setSearch }}
    >
      <ExpedientsTypesList {...{ expedientTypes }} />
    </DashboardLayout>
  );
};

export default ExpedientsTypes;
