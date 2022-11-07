import Layout from "../../layouts/layout";
import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import Button from "../../components/button";
import StepLayout from "./partials/step-layout";
import FormSection from "../../components/form-section";
import { useFormik } from "formik";
import { expedientTypes } from "../../data";
import {
  FormFileField,
  FormTextAreaField,
  FormTextField,
} from "../../components/form-field";
import {
  ExpedientRequirementType,
  FormInputType,
  SliceState,
  StoredIn,
  Type,
} from "../../utils/types";
import NewField from "../../requirements-builder/partials/new-field";
import { makeId } from "../../utils/helpers";
import Requirements from "../../requirements-builder";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getExpedientTypes } from "../../store/expedient-types";
import Form from "../../components/form";
import { createExpedient } from "../../store/expedient/API";
import { newExpedient } from "../../store/expedient";
import Sections from "../../components/sections";

const people = [
  { id: 1, name: "Leslie Alexander" },
  // More users...
];

// Pasos
// 1 - Datos cliente
// 2 - Tipo de expediente
// 3 - Datos de expediente

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const actions = [
  {
    icon: ClockIcon,
    name: "Extrangeria",
    descripcion:
      "Esta es una descripción de prueba para poner un poco de texto",
    href: "/expedients/new/1",
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    icon: CheckBadgeIcon,
    name: "Benefits",
    descripcion:
      "Esta es una descripción de prueba para poner un poco de texto",
    href: "/expedients/new/1",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    icon: UsersIcon,
    name: "Schedule a one-on-one",
    descripcion:
      "Esta es una descripción de prueba para poner un poco de texto",
    href: "/expedients/new/1",
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    icon: BanknotesIcon,
    name: "Payroll",
    descripcion:
      "Esta es una descripción de prueba para poner un poco de texto",
    href: "/expedients/new/1",
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    icon: ReceiptRefundIcon,
    name: "Submit an expense",
    descripcion:
      "Esta es una descripción de prueba para poner un poco de texto",
    href: "/expedients/new/1",
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    icon: AcademicCapIcon,
    name: "Training",
    descripcion:
      "Esta es una descripción de prueba para poner un poco de texto",
    href: "/expedients/new/1",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];

export default function NewExpedientType() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { status, value: expedientTypes } = useSelector(
    (state: RootState) => state.expedientTypes
  );

  console.log({ status, expedientTypes });

  useEffect(() => {
    dispatch(getExpedientTypes({ getAll: true }));
  }, []);

  const formik = useFormik({
    initialValues: {
      tipo: "",
      conexiones: "",
      guardadoEn: "",
      responsable: "",
      codigoCliente: "",
      codigoClienteProvisional: "",
      honorariosYSuplidos: [],
      secciones: [],
    },
    onSubmit: (values, { resetForm }) => {
      console.log({ createExpedientValues: values });
      dispatch(newExpedient(values))
        .unwrap()
        .then(() => navigate(`/expedients`))
        .catch(() => {
          alert("error");
        });
      resetForm({});
    },
  });

  const { handleSubmit, values, setFieldValue } = formik;

  useEffect(() => {
    if (expedientTypes.data) {
      const selectedExpedientType = expedientTypes.data.find(
        (expedientType) => expedientType._id === values.tipo
      );
      setFieldValue("secciones", selectedExpedientType?.secciones ?? []);
    }
  }, [values?.tipo]);

  const params = useParams();
  console.log(params);

  console.log({ values });

  return (
    <Layout
      button={{
        label: "Crear",
        onClick: handleSubmit,
      }}
      title={`Creación del expediente${
        params.vinculated ? " vinculado a expediente: " + params.vinculated : ""
      }`}
      pages={
        params.vinculated
          ? [
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
                name: "Crear expediente vinculado",
                href: "/expedients/new/2",
                current: true,
              },
            ]
          : [
              {
                name: "Nuevo expediente",
                href: "/expedients/new",
                current: true,
              },
            ]
      }
    >
      <Form
        onSubmit={handleSubmit}
        data={[
          {
            label: "Información",
            description: "",
            inputs: [
              {
                label: "Tipo",
                name: "tipo",
                type: FormInputType.Select,
                options:
                  status === SliceState.Success && expedientTypes
                    ? expedientTypes.data.map(({ nombre, codigo, _id }) => ({
                        label: `Nombre: ${nombre} Codigo: ${codigo}`,
                        id: _id,
                      }))
                    : [],
              },
              // {
              //   label: "Conexiones",
              //   name: "conexiones",
              //   type: FormInputType.Text,
              // },
              // {
              //   label: "Guardado en",
              //   name: "guardadoEn",
              //   type: FormInputType.Select,
              //   options: [
              //     { label: "En Carpeta", id: StoredIn.EnCarpeta },
              //     {
              //       label: "Expediente Vigente",
              //       id: StoredIn.CurrentExpedient,
              //     },
              //     { label: "Fisico", id: StoredIn.Fisico },
              //   ],
              // },
              // {
              //   label: "Responsable",
              //   name: "responsable",
              //   type: FormInputType.Text,
              // },
              // {
              //   label: "codigo cliente",
              //   name: "codigoCliente",
              //   type: FormInputType.Text,
              // },
              // {
              //   label: "codigo cliente provisional",
              //   name: "codigoClienteProvisional",
              //   type: FormInputType.Text,
              // },
              // {
              //   label: "Cliente",
              //   name: "cliente",
              //   type: FormInputType.Text,
              // },
              // {
              //   label: "Beneficiario",
              //   name: "beneficiario",
              //   type: FormInputType.Text,
              // },
              // {
              //   label: "Asunto",
              //   name: "asunto",
              //   type: FormInputType.Text,
              // },
              // {
              //   label: "fecha solicitud servicio notificacion",
              //   name: "fechaSolicitudServicioNotificacion",
              //   type: FormInputType.Date,
              // },
              // {
              //   label: "plazoLegal",
              //   name: "plazoLegal",
              //   type: FormInputType.Text,
              // },
              // {
              //   label: "estado",
              //   name: "estado",
              //   type: FormInputType.Text,
              // },
              // {
              //   label: "empresa",
              //   name: "empresa",
              //   type: FormInputType.Text,
              // },
              // {
              //   label: "honorarios",
              //   name: "honorarios",
              //   type: FormInputType.Text,
              // },
            ].map((item) => ({ ...item, formik })),
          },
        ]}
      >
        <Sections formik={formik} />
      </Form>
    </Layout>
  );
}
