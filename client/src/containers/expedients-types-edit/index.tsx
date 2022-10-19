import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form";
import DashboardLayout from "../../layouts/layout";
import Requirements from "../../requirements-builder";
import { makeId } from "../../utils/helpers";
import { FormInputType, ExpedientRequirementType } from "../../utils/types";

const ExpedientsTypesEdit = () => {
  const navigate = useNavigate();
  const [requirements, setRequeriments] = useState([]);

  const onAddField = ({
    nombre,
    tipo,
    descripcion = false,
  }: {
    nombre: string;
    tipo: ExpedientRequirementType;
    descripcion?: string | boolean;
  }) => {
    setRequeriments([
      ...requirements,
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
      requirements.filter((requirement) => requirement.id !== id)
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
          name: "Tipos de expediente",
          href: "/expedients-types",
          current: false,
        },
        {
          name: "Tipo de expediente",
          href: "/expedients-types/view",
          current: true,
        },
        {
          name: "Editar tipo de expediente",
          href: "/expedients-types/edit/2",
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
              requirements={requirements}
            />
          }
        />
      </div>
    </DashboardLayout>
  );
};

export default ExpedientsTypesEdit;
