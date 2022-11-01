import React, { useEffect } from "react";
import DashboardLayout from "../../layouts/layout";
import DescriptionList from "../../components/description-list";
import {
  ListItemType,
  ExpedientRequirementType,
  SliceState,
} from "../../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "../../components/tabs";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExpedient } from "../../store/expedient";
import { RootState } from "../../store";
import Loading from "../../components/loading";
import HandleStatus from "../../components/handle-status";

const ExpedientsView = () => {
  const navigate = useNavigate();

  const { status, value: expedient } = useSelector(
    (state: RootState) => state.expedient
  );

  console.log({ status, expedient });

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpedient(id));
  }, []);

  console.log({ expedient });

  return (
    <DashboardLayout
      title={expedient?.orden}
      buttonSecondary={{
        label: "Crear expedient vinculado",
        onClick: () => navigate(`/expedients/new/${expedient?._id}`),
      }}
      button={{
        label: "Editar",
        onClick: () => navigate("/expedients/edit/1"),
      }}
      pages={[
        {
          name: "Expedientes",
          href: "/expedients",
          current: false,
        },
        {
          name: "Expediente " + id,
          href: "/expedients/" + id,
          current: true,
        },
      ]}
    >
      <Tabs
        tabs={[
          { name: "Información", href: "/expedients/2", current: false },
          {
            name: "Recursos",
            href: "/expedients/2/resources",
            current: false,
          },
        ]}
      />

      <div className="mt-4">
        <HandleStatus status={status} data={expedient}>
          <Routes>
            <Route
              path=""
              element={
                <DescriptionList
                  {...{
                    title: "Datos del expediente",
                    description: "",
                    list: [
                      {
                        type: ListItemType.Text,
                        label: "identificador",
                        value: expedient?._id,
                      },
                      {
                        type: ListItemType.Text,
                        label: "orden",
                        value: expedient?.orden,
                      },
                      {
                        type: ListItemType.Button,
                        label: "vinculado",
                        value: {
                          label: expedient?.vinculado,
                          onClick: () => {
                            alert("Ir a expedient vinculado");
                          },
                        },
                      },
                      {
                        type: ListItemType.Text,
                        label: "tipo",
                        value: expedient?.tipo,
                      },
                      {
                        type: ListItemType.Text,
                        label: "conexiones",
                        value: expedient?.conexiones,
                      },
                      {
                        type: ListItemType.Text,
                        label: "guardadoEn",
                        value: expedient?.guardadoEn,
                      },
                      {
                        type: ListItemType.Text,
                        label: "responsable",
                        value: expedient?.responsable,
                      },
                      {
                        type: ListItemType.Text,
                        label: "codigoCliente",
                        value: expedient?.codigoCliente,
                      },
                      {
                        type: ListItemType.Text,
                        label: "codigoClienteProvisional",
                        value: expedient?.codigoClienteProvisional,
                      },
                      {
                        type: ListItemType.Text,
                        label: "cliente",
                        value: expedient?.cliente,
                      },
                      {
                        type: ListItemType.Text,
                        label: "beneficiario",
                        value: expedient?.beneficiario,
                      },
                      {
                        type: ListItemType.Text,
                        label: "asunto",
                        value: expedient?.asunto,
                      },
                      {
                        type: ListItemType.Text,
                        label: "fechaSolicitudServicioNotificacion",
                        value: expedient?.fechaSolicitudServicioNotificacion,
                      },
                      {
                        type: ListItemType.Text,
                        label: "plazoLegal",
                        value: expedient?.plazoLegal,
                      },
                      {
                        type: ListItemType.Text,
                        label: "estado",
                        value: expedient?.estado,
                      },
                      {
                        type: ListItemType.Text,
                        label: "empresa",
                        value: expedient?.empresa,
                      },
                      {
                        type: ListItemType.Text,
                        label: "honorarios",
                        value: expedient?.honorarios,
                      },
                      {
                        type: ListItemType.List,
                        label: "Honorarios y Suplidos",
                        value:
                          expedient?.honorariosYSuplidos &&
                          expedient?.honorariosYSuplidos.map(
                            (honorarioYSuplido) => ({
                              value: `${honorarioYSuplido?.tipo} - ${
                                honorarioYSuplido?.cantidad
                              }$ ${
                                honorarioYSuplido?.descripcion
                                  ? "- " + honorarioYSuplido?.descripcion
                                  : ""
                              }`,
                            })
                          ),
                      },
                    ],
                  }}
                />
              }
            />
            <Route
              path="resources"
              element={
                <DescriptionList
                  {...{
                    title: "Recursos",
                    description: "",
                    list:
                      expedient?.requerimientos &&
                      expedient?.requerimientos.map((requerimiento) =>
                        requerimiento?.tipo === ExpedientRequirementType.Files
                          ? {
                              type: ListItemType.Button,
                              label: requerimiento?.nombre,
                              value: {
                                label: "Descargar archivo",
                                buttonLabel: "Descargar",
                                onClick: () => {
                                  alert("desargando archivo");
                                },
                              },
                            }
                          : {
                              type: ListItemType.Text,
                              label: requerimiento?.nombre,
                              value: requerimiento.texto,
                            }
                      ),
                  }}
                />
              }
            />
          </Routes>
        </HandleStatus>
      </div>
    </DashboardLayout>
  );
};

export default ExpedientsView;
