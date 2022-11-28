import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "../../components/form";
import HandleStatus from "../../components/handle-status";
import Sections from "../../components/sections";
import DashboardLayout from "../../layouts/layout";
import { RootState } from "../../store";
import { editExpedient, getExpedient } from "../../store/expedient";
import { FormInputType, StoredIn, ExpedientState } from "../../utils/types";
import moment from "moment";

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
      cliente: expedient?.cliente ?? "",
      empresa: expedient?.empresa ?? "",
      plazoLegal: expedient?.plazoLegal ?? "",
      beneficiario: expedient?.beneficiario ?? "",
      honorarios: expedient?.honorarios ?? "",
      codigoClienteProvisional: expedient?.codigoClienteProvisional ?? "",
      honorariosYSuplidos: expedient?.honorariosYSuplidos ?? [],
      fechaSolicitudServicioNotificacion:
        expedient?.fechaSolicitudServicioNotificacion
          ? moment(expedient?.fechaSolicitudServicioNotificacion).format(
              "yyyy-M-D"
            )
          : null,
      secciones: expedient?.secciones ?? [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      try {
        values.fechaSolicitudServicioNotificacion = moment(
          values.fechaSolicitudServicioNotificacion
        );

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
                    label: "Codigo Cliente Provisional",
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
                    label: "Fecha solicitud servicio notificacion",
                    name: "fechaSolicitudServicioNotificacion",
                    type: FormInputType.Date,
                  },
                  {
                    label: "Plazo legal",
                    name: "plazoLegal",
                    type: FormInputType.Text,
                  },

                  {
                    label: "Empresa",
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
