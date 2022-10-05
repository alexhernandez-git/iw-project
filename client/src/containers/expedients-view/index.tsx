import React from "react";
import DashboardLayout from "../../layouts/layout";
import { expedients } from "../../data";
import DescriptionList from "../../components/description-list";
import {
  ListItemType,
  RequerimientoDelExpedienteTipo,
} from "../../utils/types";
import { useNavigate, useParams } from "react-router-dom";

const expediente = expedients[0];
const ExpedientsView = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  return (
    <DashboardLayout
      title={expediente.orden}
      buttonSecondary={{
        label: "Crear expediente vinculado",
        onClick: () => navigate(`/expedients/new/${expediente._id}`),
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
      <DescriptionList
        {...{
          title: "Datos del expediente",
          description: "",
          list: [
            {
              type: ListItemType.Text,
              label: "identificador",
              value: expediente._id,
            },
            {
              type: ListItemType.Text,
              label: "orden",
              value: expediente.orden,
            },
            {
              type: ListItemType.Button,
              label: "vinculado",
              value: {
                label: expediente.vinculado,
                onClick: () => {
                  alert("Ir a expediente vinculado");
                },
              },
            },
            {
              type: ListItemType.Text,
              label: "tipo",
              value: expediente.tipo,
            },
            {
              type: ListItemType.Text,
              label: "conexiones",
              value: expediente.conexiones,
            },
            {
              type: ListItemType.Text,
              label: "guardadoEn",
              value: expediente.guardadoEn,
            },
            {
              type: ListItemType.Text,
              label: "responsable",
              value: expediente.responsable,
            },
            {
              type: ListItemType.Text,
              label: "codigoCliente",
              value: expediente.codigoCliente,
            },
            {
              type: ListItemType.Text,
              label: "codigoClienteProvisional",
              value: expediente.codigoClienteProvisional,
            },
            {
              type: ListItemType.Text,
              label: "cliente",
              value: expediente.cliente,
            },
            {
              type: ListItemType.Text,
              label: "beneficiario",
              value: expediente.beneficiario,
            },
            {
              type: ListItemType.Text,
              label: "asunto",
              value: expediente.asunto,
            },
            {
              type: ListItemType.Text,
              label: "fechaSolicitudServicioNotificacion",
              value: expediente.fechaSolicitudServicioNotificacion,
            },
            {
              type: ListItemType.Text,
              label: "plazoLegal",
              value: expediente.plazoLegal,
            },
            {
              type: ListItemType.Text,
              label: "estado",
              value: expediente.estado,
            },
            {
              type: ListItemType.Text,
              label: "empresa",
              value: expediente.empresa,
            },
            {
              type: ListItemType.Text,
              label: "honorarios",
              value: expediente.honorarios,
            },
            {
              type: ListItemType.List,
              label: "Honorarios y Suplidos",
              value: expediente.honorariosYSuplidos.map(
                (honorarioYSuplido) => ({
                  value: `${honorarioYSuplido.tipo} - ${
                    honorarioYSuplido.cantidad
                  }$ ${
                    honorarioYSuplido.descripcion
                      ? "- " + honorarioYSuplido.descripcion
                      : ""
                  }`,
                })
              ),
            },
          ],
        }}
      />
      <DescriptionList
        {...{
          title: "Recursos",
          description: "",
          list: expediente.requerimientos.map((requerimiento) =>
            requerimiento.tipo === RequerimientoDelExpedienteTipo.Archivos
              ? {
                  type: ListItemType.Button,
                  label: requerimiento.nombre,
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
                  label: requerimiento.nombre,
                  value: requerimiento.texto,
                }
          ),
        }}
      />
    </DashboardLayout>
  );
};

export default ExpedientsView;
