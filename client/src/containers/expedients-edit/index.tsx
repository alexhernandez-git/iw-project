import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form";
import { expedients } from "../../data";
import DashboardLayout from "../../layouts/layout";
import Requirements from "../../requirements-builder";
import { makeId } from "../../utils/helpers";
import {
  FormInputType,
  RequerimientoDelExpedienteTipo,
} from "../../utils/types";

const ExpedientsEdit = () => {
  const navigate = useNavigate();

  const [requeriments, setRequeriments] = useState(
    expedients[0].requerimientos
  );

  const onAddField = ({
    nombre,
    tipo,
    descripcion = false,
  }: {
    nombre: string;
    tipo: RequerimientoDelExpedienteTipo;
    descripcion?: string | boolean;
  }) => {
    setRequeriments([
      ...requeriments,
      {
        id: makeId(10),
        nombre,
        tipo,
        descripcion: descripcion ? descripcion : "",
        texto: "",
        archivo: "",
        custom: true,
        disabled: true,
      },
    ]);
  };
  const onDeleteField = (id: string) => {
    setRequeriments(
      requeriments.filter((requirement) => requirement.id !== id)
    );
  };

  return (
    <DashboardLayout
      title={"Editar expediente"}
      button={{
        label: "Guardar",
        onClick: () => {
          alert("Guardado");
        },
      }}
      pages={[
        {
          name: "Expedientex",
          href: "/expedients",
          current: false,
        },
        {
          name: "Expediente 3",
          href: "/expedients/3",
          current: true,
        },
        {
          name: "Editar expediente",
          href: "/expedients/edit/2",
          current: true,
        },
      ]}
    >
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0 mb-6">
        <Form
          onSubmit={() => {}}
          data={[
            {
              label: "Información",
              description: "",
              inputs: [
                {
                  label: "Tipo",
                  name: "tipo",
                  type: FormInputType.Text,
                },
                {
                  label: "Conexiones",
                  name: "conexiones",
                  type: FormInputType.Text,
                },
                {
                  label: "Guardado en",
                  name: "guardadoEn",
                  type: FormInputType.Text,
                },
                {
                  label: "Responsable",
                  name: "responsable",
                  type: FormInputType.Text,
                },
                {
                  label: "codigo cliente",
                  name: "codigoCliente",
                  type: FormInputType.Text,
                },
                {
                  label: "Guardado en",
                  name: "guardadoEn",
                  type: FormInputType.Text,
                },
                {
                  label: "codigo cliente provisional",
                  name: "codigoClienteProvisional",
                  type: FormInputType.Text,
                },
                {
                  label: "Cliente",
                  name: "cliente",
                  type: FormInputType.Text,
                },
                {
                  label: "Beneficiario",
                  name: "beneficiario",
                  type: FormInputType.Text,
                },
                {
                  label: "Asunto",
                  name: "asunto",
                  type: FormInputType.Text,
                },
                {
                  label: "fechaSolicitudServicioNotificacion",
                  name: "fechaSolicitudServicioNotificacion",
                  type: FormInputType.Text,
                },
                {
                  label: "plazoLegal",
                  name: "plazoLegal",
                  type: FormInputType.Text,
                },
                {
                  label: "estado",
                  name: "estado",
                  type: FormInputType.Text,
                },
                {
                  label: "empresa",
                  name: "empresa",
                  type: FormInputType.Text,
                },
                {
                  label: "honorarios",
                  name: "honorarios",
                  type: FormInputType.Text,
                },
                {
                  label: "Honorarios y Suplidos",
                  name: "honorariosYSuplidos",
                  type: FormInputType.Array,
                },
              ],
            },
          ]}
          customSection={
            <Requirements
              onAddField={onAddField}
              onDeleteField={onDeleteField}
              requeriments={requeriments}
            />
          }
        />
      </div>
    </DashboardLayout>
  );
};

export default ExpedientsEdit;
