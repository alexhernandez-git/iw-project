import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "../../components/form";
import HandleStatus from "../../components/handle-status";
import Sections from "../../components/sections";
import DashboardLayout from "../../layouts/layout";
import { useAppSelector } from "../../store";
import {
  editExpedientType,
  getExpedientType,
} from "../../store/expedient-type";
import { getExpedientTypes } from "../../store/expedient-types";
import { FormInputType, SliceState } from "../../utils/types";

const ExpedientsTypesEdit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpedientType(id));
    dispatch(getExpedientTypes({ getAll: true }));
  }, []);

  const { id } = useParams();

  const { status, value: expedientType } = useAppSelector(
    (state) => state.expedientType
  );

  const { status: expedientTypesStatus, value: expedientTypes } =
    useAppSelector((state) => state.expedientTypes);

  console.log({ expedientTypes });

  const formik = useFormik({
    initialValues: {
      codigo: expedientType?.codigo ?? "",
      nombre: expedientType?.nombre ?? "",
      honorarios: expedientType?.honorarios ?? "",
      tramitePadre: expedientType?.tramitePadre?._id ?? "",
      secciones: expedientType?.secciones ?? [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      var formData = new FormData();

      const files = values?.files;

      delete values?.files;

      formData.append("data", JSON.stringify(values));

      if (files) {
        for (const [key] of Object.entries(files)) {
          Array.from(files[key]).forEach((file) => {
            formData.append(key, file, file?.name);
          });
        }
      }
      dispatch(editExpedientType({ id, data: formData }));
    },
  });

  const { handleSubmit } = formik;

  return (
    <DashboardLayout
      title={"Editar expediente"}
      button={{
        label: "Guardar",
        onClick: handleSubmit,
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
          current: false,
        },
        {
          name: "Editar tipo de expediente",
          href: `/expedients-types/edit/${id}`,
          current: true,
        },
      ]}
    >
      <HandleStatus status={status} data={expedientType}>
        <HandleStatus status={expedientTypesStatus} data={expedientTypes}>
          <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0 mb-6">
            <Form
              onSubmit={handleSubmit}
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
                      type: FormInputType.Text,
                    },
                    {
                      label: "Padre",
                      name: "tramitePadre",
                      type: FormInputType.Select,
                      options:
                        expedientTypesStatus === SliceState.Success &&
                        expedientTypes
                          ? expedientTypes.data
                              .filter(({ isAreaFuncional }) => isAreaFuncional)
                              .map(({ nombre, codigo, _id }) => ({
                                label: `Nombre: ${nombre} Codigo: ${codigo}`,
                                id: _id,
                              }))
                              .filter(
                                (expedientTypeItem) =>
                                  expedientTypeItem.id !== id
                              )
                          : [],
                    },
                  ].map((item) => ({ ...item, formik })),
                },
              ]}
            >
              <Sections formik={formik} editable />
            </Form>
          </div>
        </HandleStatus>
      </HandleStatus>
    </DashboardLayout>
  );
};

export default ExpedientsTypesEdit;
