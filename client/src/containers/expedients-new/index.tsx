import Layout from "../../layouts/layout";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { newExpedient } from "../../store/expedient";
import { useEffect, useState } from "react";
import { getExpedientTypesByParent } from "../../store/expedient-types";
import HandleStatus from "../../components/handle-status";
import SectionLayout from "../../components/section-layout";
import ItemsList from "../../components/items-list";

export default function NewExpedientType() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { status, value: expedientTypes } = useSelector(
    (state: RootState) => state.expedientTypes
  );

  useEffect(() => {
    dispatch(getExpedientTypesByParent({}));
  }, []);

  const { vinculated } = useParams() ?? { vinculated: null };

  const formik = useFormik({
    initialValues: {
      tipo: "",
      vinculado: vinculated,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(newExpedient(values))
        .unwrap()
        .then(({ expedient }) => {
          navigate(`/expedients/${expedient._id}`);
        })
        .catch(() => {
          alert("error");
        });
      resetForm({});
    },
  });

  const { handleSubmit } = formik;

  const handleGetChildrens = (parent: string) => {
    dispatch(getExpedientTypesByParent({ parent }));
  };

  const [selected, setSelected] = useState<string>();

  console.log({ selected });

  return (
    <Layout
      button={{
        label: "Siguiente",
        onClick: handleSubmit,
      }}
      title={`Creación del expediente${
        vinculated ? " vinculado a expediente: " + vinculated : ""
      }`}
      pages={
        vinculated
          ? [
              {
                name: "Expedientex",
                href: "/expedients",
                current: false,
              },
              {
                name: "Expediente 3",
                href: "/expedients/3",
                current: false,
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
      <HandleStatus data={expedientTypes} status={status}>
        <SectionLayout title={"Elige el tipo de expediente"}>
          <ItemsList
            data={[
              {
                _id: "1",
                title: "1",
                subtitle: "subtitulo",
                info: "información",
                onClick: () => {
                  setSelected("Titulo");
                },
                childrens: [
                  {
                    _id: "2",
                    title: "2",
                    subtitle: "subtitulo",
                    info: "información",
                    onClick: () => {
                      setSelected("Titulo");
                    },
                    childrens: [],
                  },
                  {
                    _id: "3",
                    title: "3",
                    subtitle: "subtitulo",
                    info: "información",
                    onClick: () => {
                      setSelected("Titulo");
                    },
                    childrens: [
                      {
                        _id: "4",
                        title: "4",
                        subtitle: "subtitulo",
                        info: "información",
                        onClick: () => {
                          setSelected("Titulo");
                        },
                        childrens: [
                          {
                            _id: "5",
                            title: "5",
                            subtitle: "subtitulo",
                            info: "información",
                            onClick: () => {
                              setSelected("Titulo");
                            },
                            childrens: [],
                          },
                        ],
                      },
                      {
                        _id: "6",
                        title: "6",
                        subtitle: "subtitulo",
                        info: "información",
                        onClick: () => {
                          setSelected("Titulo");
                        },
                        childrens: [],
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </SectionLayout>
      </HandleStatus>
    </Layout>
  );
}
