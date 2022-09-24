import React from "react";
import DashboardLayout from "../../layouts/layout";
import { tipoDeExpedientes } from "../../data";
import { FormTextField } from "../../components/form-field";

const tipoDeExpediente = tipoDeExpedientes[0];

const ExpedientsTypesView = () => {
  return (
    <DashboardLayout title={"T"}>
      <div>
        <FormTextField
          data={{
            id: "1",
            nombre: tipoDeExpediente.tipo,
            texto: tipoDeExpediente.nombre,
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default ExpedientsTypesView;
