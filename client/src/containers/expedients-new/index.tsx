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
import { ExpedientType, ListItemType } from "../../utils/types";
import DescriptionList from "../../components/description-list";
import { useSearch } from "../../hooks/use-search";

export default function NewExpedientType() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { status, value: expedientTypes } = useSelector(
    (state: RootState) => state.expedientTypes
  );

  const [search, setSearch] = useSearch({
    callback: (searchValue) => {
      console.log({ searchValue });
      dispatch(getExpedientTypesAll({ search: searchValue }));
    },
  });

  useEffect(() => {
    if (!search || search.split(" ").join("") === "") {
      console.log("entraaa");
      dispatch(getExpedientTypesAll({}));
    }
  }, [search]);

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

  const handleSelect = (id: string) => {
    console.log({ id });
    formik.setFieldValue("tipo", id);
  };

  console.log("tipo", formik.values.tipo);

  const data = useMemo(() => {
    let expedientTypesData = expedientTypes;
    if (search) {
      expedientTypesData =
        expedientTypesData &&
        expedientTypesData?.length > 0 &&
        expedientTypesData.map((item: ExpedientType) => ({
          ...item,
          title: item.nombre,
          subtitle: item.codigo,
          info: item.honorarios,
          button: {
            onClick: () => handleSelect(item._id),
            label: "Selecionar",
          },
          childrens: [],
        }));
    }
    if (!search && expedientTypes && expedientTypes?.length > 0) {
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
            button: {
              onClick: () => handleSelect(item._id),
              label: "Selecionar",
            },
            childrens: nest(items, item._id),
          }));
      expedientTypesData = nest(expedientTypesData);
    }
    return expedientTypesData;
  }, [expedientTypes, search]);

  const selectedExpedientType = useMemo(
    () =>
      expedientTypes &&
      expedientTypes?.length > 0 &&
      expedientTypes.find(
        (expedientType: ExpedientType) =>
          expedientType._id === formik.values.tipo
      ),
    [formik.values.tipo, expedientTypes]
  );

  console.log({ data });
  return (
    <Layout
      button={{
        label: "Siguiente",
        onClick: handleSubmit,
      }}
      search={{
        search,
        setSearch,
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
        <SectionLayout
          title={!selectedExpedientType ? "Elige el tipo de expediente" : null}
          button={
            selectedExpedientType && {
              label: "Volver",
              onClick: () => formik.setFieldValue("tipo", null),
            }
          }
        >
          {formik.values.tipo ? (
            <DescriptionList
              title={"Tipo de expediente: " + selectedExpedientType.codigo}
              description={""}
              list={[
                {
                  type: ListItemType.Text,
                  label: "Nombre",
                  value: selectedExpedientType?.nombre,
                },
              ]}
            />
          ) : (
            <ItemsList data={data} />
          )}
        </SectionLayout>
      </HandleStatus>
    </Layout>
  );
}
