import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/layout";
import DescriptionList from "../../components/description-list";
import {
  ListItemType,
  ExpedientRequirementType,
  Section,
  ExpedientState,
  HonorariosYSuplidosType,
} from "../../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "../../components/tabs";
import { useDispatch, useSelector } from "react-redux";
import { editExpedient, getExpedient } from "../../store/expedient";
import { RootState } from "../../store";
import HandleStatus from "../../components/handle-status";
import {
  getEstadoLabel,
  getHonorariosYSuplidosLabel,
} from "../../utils/helpers";
import moment from "moment";

const ExpedientsView = () => {
  const navigate = useNavigate();

  const { status, value: expedient } = useSelector(
    (state: RootState) => state.expedient
  );

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpedient(id));
  }, []);

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <DashboardLayout
      title={id ?? "Sin nombre"}
      buttonSecondary={{
        label: "Crear expediente vinculado",
        onClick: () => navigate(`/expedients/new/${id}`),
      }}
      button={{
        label: "Editar",
        onClick: () => navigate(`/expedients/edit/${id}`),
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
        tabIndex={tabIndex}
        setTab={setTabIndex}
        tabs={
          expedient?.secciones
            ? [
                "Ficha",
                "Honorarios y Suplidos",
                ...expedient.secciones.map(
                  (section: Section) => section.nombre
                ),
              ]
            : ["Ficha"]
        }
      />

      <div className="mt-4">
        <HandleStatus status={status} data={expedient}>
          {tabIndex === 0 && (
            <DescriptionList
              {...{
                title: "Datos del expediente",
                description: "",
                list: [
                  {
                    type: ListItemType.Text,
                    label: "Collaborator email",
                    value: expedient?.user?.email,
                  },
                  {
                    type: ListItemType.Text,
                    label: "Identificador",
                    value: expedient?._id,
                  },
                  {
                    type: ListItemType.Text,
                    label: "Estado",
                    value: getEstadoLabel(expedient?.estado),
                  },
                  {
                    type: ListItemType.Text,
                    label: "Area funcional",
                    value: expedient?.areaFuncional?.nombre,
                  },
                  {
                    type: ListItemType.Button,
                    label: "Vinculado",
                    value: {
                      label: expedient?.vinculado?._id,
                      onClick: () => {
                        window.open(
                          `/expedients/${expedient?.vinculado?._id}`,
                          "_blank"
                        );
                      },
                    },
                  },
                  {
                    type: ListItemType.Text,
                    label: "Tipo",
                    value: expedient?.tipo?.nombre,
                  },
                  {
                    type: ListItemType.Text,
                    label: "Conexiones",
                    value: expedient?.conexiones,
                  },
                  {
                    type: ListItemType.Text,
                    label: "Guardado En",
                    value: expedient?.guardadoEn,
                  },
                  {
                    type: ListItemType.Text,
                    label: "Responsable",
                    value: expedient?.responsable,
                  },
                  {
                    type: ListItemType.Text,
                    label: "Codigo Cliente Provisional",
                    value: expedient?.codigoClienteProvisional,
                  },
                  {
                    type: ListItemType.Text,
                    label: "Cliente",
                    value: expedient?.cliente,
                  },
                  {
                    type: ListItemType.Text,
                    label: "Beneficiario",
                    value: expedient?.beneficiario,
                  },
                  {
                    type: ListItemType.Text,
                    label: "Fecha Solicitud Servicio Notificación",
                    value:
                      expedient?.fechaSolicitudServicioNotificacion &&
                      moment(
                        expedient?.fechaSolicitudServicioNotificacion
                      ).format("D-M-yyyy"),
                  },
                  {
                    type: ListItemType.Text,
                    label: "Plazo Legal",
                    value:
                      expedient?.plazoLegal &&
                      moment(expedient?.plazoLegal).format("D-M-yyyy"),
                  },
                  {
                    type: ListItemType.Text,
                    label: "Empresa",
                    value: expedient?.empresa,
                  },
                  {
                    type: ListItemType.Text,
                    label: "Honorarios",
                    value: expedient?.honorarios,
                  },
                ],
              }}
            />
          )}
          {tabIndex === 1 && (
            <DescriptionList
              {...{
                title: "Datos del expediente",
                description: "",
                list: [
                  {
                    type: ListItemType.List,
                    label: "Honorarios y Suplidos",
                    value:
                      expedient?.honorariosYSuplidos &&
                      expedient?.honorariosYSuplidos.map(
                        (honorarioYSuplido) => ({
                          value: `${getHonorariosYSuplidosLabel(
                            honorarioYSuplido?.tipo
                          )} - ${honorarioYSuplido?.cantidad}€ ${
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
          )}
          {expedient?.secciones &&
            expedient?.secciones.map(
              (section, index) =>
                index + 2 === tabIndex && (
                  <DescriptionList
                    {...{
                      title: section.nombre,
                      description: "",
                      list:
                        section.recursos &&
                        section.recursos.map((requerimiento) =>
                          requerimiento?.tipo === ExpedientRequirementType.Files
                            ? {
                                type: ListItemType.Button,
                                label: requerimiento?.nombre,
                                value: {
                                  label:
                                    requerimiento?.archivos &&
                                    requerimiento?.archivos.length > 0 &&
                                    requerimiento?.archivos[0].split("]-[")[1],
                                  buttonLabel: "Descargar",
                                  onClick: () => {
                                    window.open(
                                      "http://3.253.49.204:8080/files/" +
                                        requerimiento?.archivos[0]
                                    );
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
                )
            )}
        </HandleStatus>
      </div>
    </DashboardLayout>
  );
};

export default ExpedientsView;
