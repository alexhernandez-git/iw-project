import React from "react";
import ExpedientsTypesList from "../../components/expedients-types-list";
import DashboardLayout from "../../layouts/layout";
import { tipoDeExpedientes } from "../../data";
import ExpedientsTypesHeading from "./partials/expedients-types-heading";

const ExpedientsTypes = () => {
  return (
    <DashboardLayout title={"Tipos de expedientes"}>
      <ExpedientsTypesList {...{ tipoDeExpedientes }} />
    </DashboardLayout>
  );
};

export default ExpedientsTypes;
