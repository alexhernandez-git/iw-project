import React from "react";
import ExpedientsTypesList from "../../components/expedients-types-list";
import DashboardLayout from "../../layouts/layout";
import { tipoDeExpedientes } from "../../data";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../utils/use-search";

const ExpedientsTypes = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearch({
    callback: (searchValue) => {
      console.log("text-changed expedients types", searchValue);
    },
  });
  return (
    <DashboardLayout
      title={"Tipos de expedientes"}
      button={{
        label: "Crear",
        onClick: () => navigate("/expedients-types/new"),
      }}
      search={{ search, setSearch }}
    >
      <ExpedientsTypesList {...{ tipoDeExpedientes }} />
    </DashboardLayout>
  );
};

export default ExpedientsTypes;
