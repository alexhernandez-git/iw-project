import Layout from "../../layouts/layout";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { newExpedient } from "../../store/expedient";
import { useEffect, useMemo, useState } from "react";
import { getExpedientTypesAll } from "../../store/expedient-types";
import HandleStatus from "../../components/handle-status";
import SectionLayout from "../../components/section-layout";
import ItemsList from "../../components/items-list";
import { ExpedientType } from "../../utils/types";

export default function NewExpedientType() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { status, value: expedientTypes } = useSelector(
    (state: RootState) => state.expedientTypes
  );

  useEffect(() => {
    dispatch(getExpedientTypesAll({ parent }));
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

  const data = useMemo(() => {
    let expedientTypesNested = [];
    if (expedientTypes && expedientTypes?.length > 0) {
      const nest = (
        items: ExpedientType[],
        _id: null | string = null,
        link: string = "tramitePadre"
      ) =>
        items
          .filter((item: ExpedientType) => item[link] === _id)
          .map((item: ExpedientType) => ({
            ...item,
            title: item.nombre,
            subtitle: item.codigo,
            info: item.honorarios,
            onClick: () => {
              setSelected(item._id);
            },
            childrens: nest(items, item._id),
          }));
      expedientTypesNested = nest(expedientTypes);
    }
    return expedientTypesNested;
  }, [expedientTypes]);

  const [selected, setSelected] = useState<string>();

  console.log({ data });
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
          <ItemsList data={data} />
        </SectionLayout>
      </HandleStatus>
    </Layout>
  );
}
