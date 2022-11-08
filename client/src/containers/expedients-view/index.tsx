import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/layout";
import DescriptionList from "../../components/description-list";
import {
  ListItemType,
  ExpedientRequirementType,
  SliceState,
  Section,
  ExpedientState,
  HonorariosYSuplidosType,
} from "../../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "../../components/tabs";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editExpedient, getExpedient } from "../../store/expedient";
import { RootState } from "../../store";
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

  console.log({ expedient13211: expedient });

  const handlePublishExpedient = () => {
    dispatch(
      editExpedient({
        id,
        data: {
          estado: ExpedientState.DocumentacionPendiente,
        },
      })
    );
  };

  const [tabIndex, setTabIndex] = useState(0);

  const getHonorariosYSuplidosLabel = (tipo) => {
    switch (tipo) {
      case HonorariosYSuplidosType.DenominacionSocial:
        return "Denominación social";
      case HonorariosYSuplidosType.Notaria:
        return "Notaria";
      case HonorariosYSuplidosType.RegistroMercantil:
        return "Registro Mercantil";
      case HonorariosYSuplidosType.Tasas:
        return "Tasas";
      default:
        return "No definido";
    }
  };

  return (
    <DashboardLayout
      title={expedient?.orden ?? id ?? "Sin nombre"}
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
      {expedient?.estado === ExpedientState.Draft && (
        <span className="rounded bg-yellow-100 text-yellow-600 text-sm px-3 py-2 my-5 w-full block">
          Este expediente esta en draft por lo que solo lo puedes ver tu, haz{" "}
          <span
            onClick={handlePublishExpedient}
            className="cursor-pointer underline"
          >
            click aqui
          </span>{" "}
          para publicarlo
        </span>
      )}
      <Tabs
        tabIndex={tabIndex}
        setTab={setTabIndex}
        tabs={
          expedient?.secciones
            ? [
                "Información",
                "Honorarios y Suplidos",
                ...expedient.secciones.map(
                  (section: Section) => section.nombre
                ),
              ]
            : ["Información"]
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
                    label: "identificador",
                    value: expedient?._id,
                  },
                  {
                    type: ListItemType.Text,
                    label: "Estado",
                    value: expedient?.estado,
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
                )
            )}
        </HandleStatus>
      </div>
    </DashboardLayout>
  );
};

export default ExpedientsView;
