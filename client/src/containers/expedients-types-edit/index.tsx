import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../components/form";
import HandleStatus from "../../components/handle-status";
import DashboardLayout from "../../layouts/layout";
import Requirements from "../../requirements-builder";
import { useAppSelector } from "../../store";
import { getExpedientType } from "../../store/expedient-type";
import { getExpedientTypes } from "../../store/expedient-types";
import { makeId } from "../../utils/helpers";
import {
  FormInputType,
  ExpedientRequirementType,
  SliceState,
} from "../../utils/types";

const ExpedientsTypesEdit = () => {
  const navigate = useNavigate();

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

  console.log({ expedientTypesStatus, expedientTypes });

  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      requirements: expedientType?.requerimientos,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { values, handleSubmit } = formik;

  return (
    <DashboardLayout
      title={"Editar expediente"}
      button={{
        label: "Guardar",
        onClick: handleSubmit,
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
      <HandleStatus status={status} data={expedientType}>
        <HandleStatus status={expedientTypesStatus} data={expedientTypes}>
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
                      options:
                        expedientTypesStatus === SliceState.Success &&
                        expedientTypes
                          ? expedientTypes.data
                              .map(({ nombre, codigo }) => ({
                                label: nombre,
                                id: codigo,
                              }))
                              .filter(
                                (expedientType) => expedientType.id !== id
                              )
                          : [],
                    },
                  ].map((item) => ({ ...item, formik })),
                },
              ]}
            >
              <Requirements
                formik={formik}
                requirements={values.requirements}
              />
            </Form>
          </div>
        </HandleStatus>
      </HandleStatus>
    </DashboardLayout>
  );
};

export default ExpedientsTypesEdit;
