import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "../../components/form";
import HandleStatus from "../../components/handle-status";
import Sections from "../../components/sections";
import DashboardLayout from "../../layouts/layout";
import { RootState } from "../../store";
import {
  editExpedient,
  editFileExpedient,
  getExpedient,
} from "../../store/expedient";
import { FormInputType, StoredIn, ExpedientState } from "../../utils/types";
import moment from "moment";
import useUserRole from "../../hooks/use-user-role";

const ExpedientsEdit = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { status, value: expedient } = useSelector(
    (state: RootState) => state.expedient
  );

  const { isAdmin, isSuperAdmin } = useUserRole();

  const formik = useFormik({
    initialValues: {
      tipo: expedient?.tipo ?? "",
      conexiones: expedient?.conexiones ?? "",
      guardadoEn: expedient?.guardadoEn ?? "",
      responsable: expedient?.responsable ?? "",
      estado: expedient?.estado ?? "",
      cliente: expedient?.cliente ?? "",
      empresa: expedient?.empresa ?? "",
      beneficiario: expedient?.beneficiario ?? "",
      honorarios: expedient?.honorarios ?? "",
      codigoClienteProvisional: expedient?.codigoClienteProvisional ?? "",
      honorariosYSuplidos: expedient?.honorariosYSuplidos ?? [],
      plazoLegal: expedient?.plazoLegal
        ? moment(expedient?.plazoLegal).format("yyyy-M-D")
        : null,
      fechaSolicitud: expedient?.fechaSolicitud
        ? moment(expedient?.fechaSolicitud).format("yyyy-M-D")
        : null,
      silencioAdministrativo: expedient?.silencioAdministrativo
        ? moment(expedient?.silencioAdministrativo).format("yyyy-M-D")
        : null,
      fechaNotificacion: expedient?.fechaNotificacion
        ? moment(expedient?.fechaNotificacion).format("yyyy-M-D")
        : null,
      secciones: expedient?.secciones ?? [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      try {
        values.fechaSolicitud = moment(values.fechaSolicitud);
        values.plazoLegal = moment(values.plazoLegal);
        values.silencioAdministrativo = moment(values.silencioAdministrativo);
        values.fechaNotificacion = moment(values.fechaNotificacion);

        var formData = new FormData();

        formData.append("data", JSON.stringify(values));

        console.log({ formData });

        dispatch(editExpedient({ id, data: formData }));
      } catch (error) {
        console.log({ error });
      }
    },
  });

  const { handleSubmit, values } = formik;

  useEffect(() => {
    dispatch(getExpedient(id));
  }, []);

  const updateFile = ({ token, file }: { token: string; file: any }) => {
    const data = new FormData();
    data.append("files", file, file.name);
    dispatch(editFileExpedient({ id, token, data }));
  };

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
            data={
              isAdmin || isSuperAdmin
                ? [
                    {
                      label: "Información",
                      description: "",
                      inputs: [
                        {
                          label: "Estado", // si
                          name: "estado",
                          type: FormInputType.Select,
                          options: [
                            {
                              id: ExpedientState.DocumentacionPendiente,
                              label: "Pendiente",
                            },
                            {
                              id: ExpedientState.DocumentacionCompleta,
                              label: "Para cursar",
                            },
                            {
                              id: ExpedientState.ExpedientCursadoNoConcluido,
                              label: "Cursado no concluido",
                            },
                            {
                              id: ExpedientState.Concluido,
                              label: "Concluido",
                            },
                            {
                              id: ExpedientState.ResolucionFaborable,
                              label: "Resolución favorable",
                            },
                            {
                              id: ExpedientState.ResolucionDeNegatoria,
                              label: "Resolución denegatoria",
                            },
                            {
                              id: ExpedientState.NoResolucion,
                              label: "No resolución",
                            },
                          ],
                        },
                        {
                          label: "Conexiones", // no
                          name: "conexiones",
                          type: FormInputType.Text,
                        },
                        {
                          label: "Guardado en", // no
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
                          label: "Responsable", // no
                          name: "responsable",
                          type: FormInputType.Text,
                        },
                        {
                          label: "Codigo Cliente", // no
                          name: "codigoClienteProvisional",
                          type: FormInputType.Text,
                        },
                        {
                          label: "Cliente", // si
                          name: "cliente",
                          type: FormInputType.Text,
                        },
                        {
                          label: "Beneficiario", // si
                          name: "beneficiario",
                          type: FormInputType.Text,
                        },
                        {
                          label: "Fecha solicitud", // si // creacion
                          name: "fechaSolicitud",
                          type: FormInputType.Date,
                        },
                        {
                          label: "Plazo legal", // no
                          name: "plazoLegal",
                          type: FormInputType.Date,
                        },
                        {
                          label: "Silencio Administrativo", // no
                          name: "silencioAdministrativo",
                          type: FormInputType.Date,
                        },
                        {
                          label: "Fecha notificación", // si
                          name: "fechaNotificacion",
                          type: FormInputType.Date,
                        },
                        {
                          label: "Empresa", // no
                          name: "empresa",
                          type: FormInputType.Text,
                        },
                        {
                          label: "Honorarios",
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
                  ]
                : [
                    {
                      label: "Información",
                      description: "",
                      inputs: [
                        {
                          label: "Estado", // si
                          name: "estado",
                          type: FormInputType.Select,
                          options: [
                            {
                              id: ExpedientState.DocumentacionPendiente,
                              label: "Pendiente",
                            },
                            {
                              id: ExpedientState.DocumentacionCompleta,
                              label: "Para cursar",
                            },
                            {
                              id: ExpedientState.ExpedientCursadoNoConcluido,
                              label: "Cursado no concluido",
                            },
                            {
                              id: ExpedientState.Concluido,
                              label: "Concluido",
                            },
                            {
                              id: ExpedientState.ResolucionFaborable,
                              label: "Resolución favorable",
                            },
                            {
                              id: ExpedientState.ResolucionDeNegatoria,
                              label: "Resolución denegatoria",
                            },
                            {
                              id: ExpedientState.NoResolucion,
                              label: "No resolución",
                            },
                          ],
                        },
                        {
                          label: "Cliente", // si
                          name: "cliente",
                          type: FormInputType.Text,
                        },
                        {
                          label: "Beneficiario", // si
                          name: "beneficiario",
                          type: FormInputType.Text,
                        },
                        {
                          label: "Fecha notificación", // si
                          name: "fechaNotificacion",
                          type: FormInputType.Date,
                        },
                      ].map((item) => ({ ...item, formik })),
                    },
                  ]
            }
          >
            <Sections
              updateFile={updateFile}
              formik={formik}
              editable={isAdmin || isSuperAdmin}
            />
          </Form>
        </div>
      </HandleStatus>
    </DashboardLayout>
  );
};

export default ExpedientsEdit;
