import React, { useEffect } from "react";
import DashboardLayout from "../../layouts/layout";
import DescriptionList from "../../components/description-list";
import { ExpedientRequirementType, ListItemType } from "../../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import HandleStatus from "../../components/handle-status";
import { getExpedientType } from "../../store/expedient-type";
import { downloadUsingFetch } from "../../utils/helpers";

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
      title={
        expedientType?.codigo.length !== 0
          ? expedientType?.codigo
          : "Expediente sin codigo"
      }
      button={{
        label: "Editar",
        onClick: () => navigate(`/expedients-types/edit/${id}`),
      }}
      pages={[
        {
          name: "Tipos de trámites",
          href: "/expedients-types",
          current: false,
        },
        {
          name: "Tipo de expediente",
          href: `/expedients-types/${id}`,
          current: true,
        },
      ]}
    >
      <HandleStatus status={status} data={expedientType}>
        <DescriptionList
          {...{
            title: "Datos del expediente",
            list: [
              {
                type: ListItemType.Text,
                label: "Nombre",
                value: expedientType?.nombre,
              },
              {
                type: ListItemType.Text,
                label: "Codigo",
                value: expedientType?.codigo,
              },
              {
                type: ListItemType.Text,
                label: "Honorarios",
                value: expedientType?.honorarios,
              },
              {
                type: ListItemType.Text,
                label: "Es area funcional",
                value: expedientType?.isAreaFuncional ? "Si" : "No",
              },
              {
                type: ListItemType.Button,
                label: "Padre",
                value: {
                  label: expedientType?.tramitePadre?.codigo,
                  onClick: () => {
                    window.open(
                      `/expedients-types/${expedientType?.tramitePadre?._id}`,
                      "_blank"
                    );
                  },
                },
              },
              // {
              //   type: ListItemType.List,
              //   label: "Hijos",
              //   value: expedientType?.trámitesHijos.map((tramiteHijo) => ({
              //     value: tramiteHijo.codigo,
              //     onClick: () => {
              //       window.open(
              //         `/expedients-types/${tramiteHijo?._id}`,
              //         "_blank"
              //       );
              //     },
              //   })),
              // },
            ],
          }}
        />

        {expedientType?.secciones.map((section) => (
          <DescriptionList
            {...{
              title: section.nombre,
              list: section?.recursos.map((requerimiento) =>
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
                        label:
                          requerimiento?.archivos &&
                          requerimiento?.archivos.length > 0 &&
                          requerimiento?.archivos[0].split("]-[")[1],
                        buttonLabel:
                          requerimiento?.archivos &&
                          requerimiento?.archivos.length > 0
                            ? "Descargar"
                            : "",
                        onClick: () => {
                          requerimiento?.archivos &&
                            requerimiento?.archivos.length > 0 &&
                            downloadUsingFetch(
                              "http://52.214.212.142/api/files/" +
                                requerimiento?.archivos[0]
                            );
                        },
                      },
                    }
              ),
            }}
          />
        ))}
      </HandleStatus>
    </DashboardLayout>
  );
};

export default ExpedientsTypesView;
