import React from "react";
import ExpedientsTypesList from "../../components/expedients-types-list";
import DashboardLayout from "../../layouts/layout";
import { tipoDeExpedientes } from "../../data";
import ExpedientsTypesHeading from "./partials/expedients-types-heading";
import { useNavigate } from "react-router-dom";

const ExpedientsTypes = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout
      title={"Tipos de expedientes"}
      button={{
        label: "Crear",
        onClick: () => navigate("/expedients-types/new"),
      }}
    >
      <ExpedientsTypesList {...{ tipoDeExpedientes }} />
    </DashboardLayout>
  );
};

export default ExpedientsTypes;
