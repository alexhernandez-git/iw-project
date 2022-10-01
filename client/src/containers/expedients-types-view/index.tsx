import React from "react";
import DashboardLayout from "../../layouts/layout";
import { tipoDeExpedientes } from "../../data";
import DescriptionList from "../../components/description-list";
import { ListItemType } from "../../utils/types";
import { useNavigate } from "react-router-dom";

const tipoDeExpediente = tipoDeExpedientes[0];

const ExpedientsTypesView = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      title={tipoDeExpediente.nombre}
      button={{
        label: "Editar",
        onClick: () => navigate("/expedients-types/edit/1"),
      }}
    >
      <DescriptionList
        {...{
          title: "Datos del expediente",
          description: "hola a todos",
          list: [
            {
              type: ListItemType.Text,
              label: "Nombre",
              value: "Hola",
            },
            {
              type: ListItemType.Button,
              label: "Padre",
              value: {
                value: "Expediente 1",
                onClick: () => {},
              },
            },
            {
              type: ListItemType.List,
              label: "Hijos",
              value: [
                {
                  value: "Expediente 3",
                  onClick: () => {},
                },
                {
                  value: "Expediente 4",
                  onClick: () => {},
                },
              ],
            },
          ],
        }}
      />
      <DescriptionList
        {...{
          title: "Requerimientos del expediente",
          description: "hola a todos",
          list: [
            {
              type: ListItemType.Text,
              label: "Nombre",
              value: "Texto",
            },
            {
              type: ListItemType.Text,
              label: "DNI",
              value: "Archivos",
            },
          ],
        }}
      />
    </DashboardLayout>
  );
};

export default ExpedientsTypesView;
