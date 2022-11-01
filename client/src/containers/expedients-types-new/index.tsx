import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form";
import DashboardLayout from "../../layouts/layout";
import Requirements from "../../requirements-builder";
import { makeId } from "../../utils/helpers";
import { FormInputType, ExpedientRequirementType } from "../../utils/types";
import { useFormik } from "formik";

const ExpedientsTypesNew = () => {
  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [requirements, setRequeriments] = useState([]);

  return (
    <DashboardLayout
      title={"Nuevo tipo de expediente"}
      button={{
        label: "Crear",
        onClick: formik.handleSubmit,
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
          onSubmit={formik.handleSubmit}
          data={[
            {
              label: "Información",
              description: "Descripcion",
              inputs: [
                {
                  label: "Codigo",
                  name: "code",
                  formik,
                  type: FormInputType.Text,
                },
                {
                  label: "Nombre",
                  name: "name",
                  formik,
                  type: FormInputType.Text,
                },
                {
                  label: "Honorarios",
                  name: "codigo",
                  formik,
                  type: FormInputType.Text,
                },
                {
                  label: "Padre",
                  name: "parent",
                  options: [
                    { id: "parent1", label: "parent1" },
                    { id: "parent2", label: "parent2" },
                    { id: "parent3", label: "parent3" },
                  ],
                  formik,
                  type: FormInputType.Select,
                },
              ],
            },
          ]}
        >
          <Requirements formik={formik} requirements={requirements} />
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default ExpedientsTypesNew;
