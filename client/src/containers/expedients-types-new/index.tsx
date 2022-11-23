import React, { useEffect } from "react";
import Form from "../../components/form";
import DashboardLayout from "../../layouts/layout";
import { FormInputType, SliceState } from "../../utils/types";
import { useFormik } from "formik";
import Sections from "../../components/sections";
import { useAppDispatch, useAppSelector } from "../../store";
import { newExpedientType } from "../../store/expedient-type";
import { useNavigate } from "react-router-dom";
import { getExpedientTypes } from "../../store/expedient-types";

const ExpedientsTypesNew = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getExpedientTypes({ getAll: true }));
  }, []);

  const { status: expedientTypesStatus, value: expedientTypes } =
    useAppSelector((state) => state.expedientTypes);

  const formik = useFormik({
    initialValues: {
      codigo: "",
      nombre: "",
      honorarios: "",
      tramitePadre: "",
      isAreaFuncional: false,
      secciones: [],
      files: [],
    },
    onSubmit: (values) => {
      var formData = new FormData();

      const files = values?.files;

      delete values?.files;

      formData.append("data", JSON.stringify(values));

      console.log({ files });

      if (files) {
        for (const [key] of Object.entries(files)) {
          console.log({ filesKeY: files[key] });
          Array.from(files[key]).forEach((file) => {
            console.log({ file });
            formData.append(key, file, file?.name);
          });
        }
      }

      dispatch(newExpedientType(formData))
        .unwrap()
        .then(() => navigate(`/expedients-types`))
        .catch(() => {
          alert("error");
        });
    },
  });

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
                  name: "codigo",
                  type: FormInputType.Text,
                },
                {
                  label: "Nombre",
                  name: "nombre",
                  type: FormInputType.Text,
                },
                {
                  label: "Honorarios",
                  name: "honorarios",
                  formik,
                  type: FormInputType.Text,
                },
                {
                  label: "Es area funcional",
                  name: "isAreaFuncional",
                  formik,
                  type: FormInputType.Checkbox,
                },
                {
                  label: "Padre",
                  name: "tramitePadre",
                  type: FormInputType.Select,
                  options:
                    expedientTypesStatus === SliceState.Success &&
                    expedientTypes
                      ? expedientTypes.data.map(({ nombre, codigo, _id }) => ({
                          label: `Nombre: ${nombre} Codigo: ${codigo}`,
                          id: _id,
                        }))
                      : [],
                },
              ].map((item) => ({ ...item, formik })),
            },
          ]}
        >
          <Sections formik={formik} />
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default ExpedientsTypesNew;
