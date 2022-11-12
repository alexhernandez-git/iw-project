import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../components/form";
import HandleStatus from "../../components/handle-status";
import Sections from "../../components/sections";
import { expedients } from "../../data";
import DashboardLayout from "../../layouts/layout";
import Requirements from "../../requirements-builder";
import { RootState, useAppDispatch } from "../../store";
import { editExpedient, getExpedient } from "../../store/expedient";
import { updateExpedient } from "../../store/expedient/API";
import { makeId } from "../../utils/helpers";
import {
  FormInputType,
  StoredIn,
  ExpedientRequirementType,
  ExpedientState,
} from "../../utils/types";

const ExpedientsEdit = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { status, value: expedient } = useSelector(
    (state: RootState) => state.expedient
  );

  const formik = useFormik({
    initialValues: {
      tipo: expedient?.tipo ?? "",
      conexiones: expedient?.conexiones ?? "",
      guardadoEn: expedient?.guardadoEn ?? "",
      responsable: expedient?.responsable ?? "",
      estado: expedient?.estado ?? "",
      codigoCliente: expedient?.codigoCliente ?? "",
      codigoClienteProvisional: expedient?.codigoClienteProvisional ?? "",
      honorariosYSuplidos: expedient?.honorariosYSuplidos ?? [],
      secciones: expedient?.secciones ?? [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log({ values });
      dispatch(editExpedient({ id, data: values }));
    },
  });

  const { handleSubmit, values } = formik;

  useEffect(() => {
    dispatch(getExpedient(id));
  }, []);

  return (
    <DashboardLayout
      title={"Editar expediente"}
      button={{
        label: "Guardar",
        onClick: handleSubmit,
      }}
      pages={[
        {
          name: "Expedientes",
          href: "/expedients",
          current: false,
        },
        {
          name: `Expediente`,
          href: `/expedients/${id}`,
          current: true,
        },
        {
          name: "Editar expediente",
          href: `/expedients/edit/${id}`,
          current: true,
        },
      ]}
    >
      <HandleStatus status={status} data={expedient}>
        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0 mb-6">
          <Form
            onSubmit={handleSubmit}
            data={[
              {
                label: "Información",
                description: "",
                inputs: [
                  {
                    label: "Estado",
                    name: "estado",
                    type: FormInputType.Select,
                    options: [
                      { id: ExpedientState.Borrador, label: "Borrador" },
                      {
                        id: ExpedientState.DocumentacionPendiente,
                        label: "Documentación pendiente",
                      },
                      {
                        id: ExpedientState.DocumentacionCompleta,
                        label: "Documentación completa",
                      },
                      {
                        id: ExpedientState.ExpedientCursadoNoConcluido,
                        label: "Expediente cursado no concluido",
                      },
                      { id: ExpedientState.Concluido, label: "Concluido" },
                      {
                        id: ExpedientState.ResolucionFaborable,
                        label: "Resolución favorable",
                      },
                      {
                        id: ExpedientState.ResolucionDeNegatoria,
                        label: "Resolución de negatoria",
                      },
                      {
                        id: ExpedientState.NoResolucion,
                        label: "No resolución",
                      },
                    ],
                  },
                  {
                    label: "Conexiones",
                    name: "conexiones",
                    type: FormInputType.Text,
                  },
                  {
                    label: "Guardado en",
                    name: "guardadoEn",
                    type: FormInputType.Select,
                    options: [
                      { id: StoredIn.EnCarpeta, label: "En carpeta" },
                      {
                        id: StoredIn.CurrentExpedient,
                        label: "Expediente vigente",
                      },
                      {
                        id: StoredIn.Fisico,
                        label: "En físico",
                      },
                    ],
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
                    label: "fecha solicitud servicio notificacion",
                    name: "fechaSolicitudServicioNotificacion",
                    type: FormInputType.Date,
                  },
                  {
                    label: "plazoLegal",
                    name: "plazoLegal",
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
                ].map((item) => ({ ...item, formik })),
              },
              {
                label: "Honorarios y Suplidos",
                description: "",
                inputs: [
                  {
                    label: "Honorarios y Suplidos",
                    name: "honorariosYSuplidos",
                    type: FormInputType.Array,
                  },
                ].map((item) => ({ ...item, formik })),
              },
            ]}
          >
            <Sections formik={formik} />
          </Form>
        </div>
      </HandleStatus>
    </DashboardLayout>
  );
};

export default ExpedientsEdit;
