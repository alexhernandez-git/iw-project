import React, { useEffect } from "react";
import DashboardLayout from "../../layouts/layout";
import { expedientTypes } from "../../data";
import DescriptionList from "../../components/description-list";
import { ExpedientRequirementType, ListItemType } from "../../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import HandleStatus from "../../components/handle-status";
import { getExpedientType } from "../../store/expedient-type";

const tipoDeExpediente = expedientTypes[0];

const ExpedientsTypesView = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getExpedientType(id));
    }
  }, []);

  const { status, value: expedientType } = useAppSelector(
    (state) => state.expedientType
  );

  return (
    <DashboardLayout
      title={tipoDeExpediente.nombre}
      button={{
        label: "Editar",
        onClick: () => navigate("/expedients-types/edit/1"),
      }}
      pages={[
        {
          name: "Tipos de expediente",
          href: "/expedients-types",
          current: false,
        },
        {
          name: "Tipo de expediente",
          href: "/expedients-types/view",
          current: true,
        },
      ]}
    >
      <HandleStatus status={status} data={expedientTypes}>
        <DescriptionList
          {...{
            title: "Datos del expediente",
            description: "hola a todos",
            list: [
              {
                type: ListItemType.Text,
                label: "Nombre",
                value: expedientType?.nombre,
              },
              {
                type: ListItemType.Button,
                label: "Padre",
                value: {
                  label: "Expediente 1",
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
            list: expedientType?.requerimientos.map((requerimiento) =>
              requerimiento.tipo === ExpedientRequirementType.Text ||
              requerimiento.tipo === ExpedientRequirementType.LargeText
                ? {
                    type: ListItemType.Text,
                    label: requerimiento.nombre,
                    value: requerimiento.texto,
                  }
                : {
                    type: ListItemType.Button,
                    label: requerimiento.nombre,
                    value: {
                      label: "imagen.png",
                      onClick: () => alert("descargando"),
                      buttonLabel: "Descargar",
                    },
                  }
            ),
          }}
        />
      </HandleStatus>
    </DashboardLayout>
  );
};

export default ExpedientsTypesView;
