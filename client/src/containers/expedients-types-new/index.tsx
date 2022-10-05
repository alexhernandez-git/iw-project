import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form";
import DashboardLayout from "../../layouts/layout";
import Requirements from "../../requirements-builder";
import { makeId } from "../../utils/helpers";
import {
  FormInputType,
  RequerimientoDelExpedienteTipo,
} from "../../utils/types";

const ExpedientsTypesNew = () => {
  const navigate = useNavigate();

  const [requeriments, setRequeriments] = useState([]);

  const onAddField = ({
    nombre,
    tipo,
    descripcion = false,
  }: {
    nombre: string;
    tipo: RequerimientoDelExpedienteTipo;
    descripcion?: string | boolean;
  }) => {
    console.log({ nombre, tipo, descripcion });
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
      title={"Nuevo tipo de expediente"}
      button={{
        label: "Crear",
        onClick: () => navigate("/expedients-types/1"),
      }}
      pages={[
        {
          name: "Tipos de expediente",
          href: "/expedients-types",
          current: false,
        },
        {
          name: "Nuevo tipo de expediente",
          href: "/expedients-types/new",
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
              description: "Descripcion",
              inputs: [
                {
                  label: "Codigo",
                  name: "code",
                  type: FormInputType.Text,
                },
                {
                  label: "Nombre",
                  name: "name",
                  type: FormInputType.Text,
                },
                {
                  label: "Padre",
                  name: "parent",
                  type: FormInputType.Select,
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

export default ExpedientsTypesNew;
