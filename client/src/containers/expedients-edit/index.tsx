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
import { RootState } from "../../store";
import { getExpedient } from "../../store/expedient";
import { makeId } from "../../utils/helpers";
import {
  FormInputType,
  StoredIn,
  ExpedientRequirementType,
} from "../../utils/types";

const ExpedientsEdit = () => {
  const { id } = useParams();

  const { status, value: expedient } = useSelector(
    (state: RootState) => state.expedient
  );

  const [requirements, setRequeriments] = useState(expedient?.recursos);

  useEffect(() => {
    if (expedient?.recursos) {
      setRequeriments(expedient.recursos);
    }
  }, [expedient]);

  const formik = useFormik({
    initialValues: {
      tipo: expedient?.tipo ?? "",
      conexiones: expedient?.conexiones ?? "",
      guardadoEn: expedient?.guardadoEn ?? "",
      responsable: expedient?.guardadoEn ?? "",
      codigoCliente: expedient?.codigoCliente ?? "",
      codigoClienteProvisional: expedient?.codigoClienteProvisional ?? "",
      honorariosYSuplidos: expedient?.honorariosYSuplidos ?? [],
      secciones: expedient?.secciones ?? [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { handleSubmit, values } = formik;

  const dispatch = useDispatch();

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
                    label: "Conexiones",
                    name: "conexiones",
                    type: FormInputType.Text,
                  },
                  {
                    label: "Guardado en",
                    name: "guardadoEn",
                    type: FormInputType.Select,
                    options: [
                      StoredIn.EnCarpeta,
                      StoredIn.CurrentExpedient,
                      StoredIn.Fisico,
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
