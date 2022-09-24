import React from "react";
import DashboardLayout from "../../layouts/layout";
import { tipoDeExpedientes } from "../../data";
import DescriptionList from "../../components/description-list";

const tipoDeExpediente = tipoDeExpedientes[0];

const ExpedientsTypesView = () => {
  return (
    <DashboardLayout title={tipoDeExpediente.nombre}>
      <DescriptionList />
    </DashboardLayout>
  );
};

export default ExpedientsTypesView;
