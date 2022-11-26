import React, { useEffect, useMemo } from "react";
import ExpedientsList from "../../components/expedients-list";
import DashboardLayout from "../../layouts/layout";
import { useSearch } from "../../hooks/use-search";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../store";
import { ExpedientState, SliceState, StoredIn } from "../../utils/types";
import Loading from "../../components/loading";
import { getExpedients } from "../../store/expedients";
import Pagination from "../../components/pagination";
import HandleStatus from "../../components/handle-status";
import { useFilters } from "../../hooks/use-filters";
import {
  getExpedientTypesFunctionalAreas,
  getExpedientTypesNames,
} from "../../store/expedient-types";

const Expedients = () => {
  const {
    status,
    value: { page, size, count, data },
  } = useSelector((state: RootState) => state.expedients);

  console.log({ data });

  const { value: user } = useAppSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpedients({}));
  }, []);

  const [search, setSearch] = useSearch({
    callback: (searchValue) => {
      console.log("text-changed expedients", searchValue);
      dispatch(getExpedients({ search: searchValue }));
    },
  });

  const functionalAreas = useMemo(() => {
    let result: { label: string; value: string }[] = [];
    dispatch(getExpedientTypesFunctionalAreas())
      .unwrap()
      .then((data: { nombre: string; _id: string }[]) => {
        result = data.map((item) => ({
          label: item.nombre,
          value: item._id,
        }));
      });
    return result;
  }, []);

  const expedientTypesNames = useMemo(() => {
    let result: { label: string; value: string }[] = [];
    dispatch(getExpedientTypesNames())
      .unwrap()
      .then((data: { nombre: string; _id: string }[]) => {
        result = data.map((item) => ({
          label: item.nombre,
          value: item._id,
        }));
      });
    return result;
  }, []);

  const { resetFilters, filters } = useFilters({
    callback: (filters) => {
      dispatch(getExpedients({ search, filters }));
    },
    filters: [
      {
        label: "Estado",
        name: "estado",
        value: "",
        options: [
          {
            label: "Documentación pendiente",
            value: ExpedientState.DocumentacionPendiente,
          },
          {
            label: "Documentación completa",
            value: ExpedientState.DocumentacionCompleta,
          },
          {
            label: "Expediente cursado no concluido",
            value: ExpedientState.ExpedientCursadoNoConcluido,
          },
          {
            label: "No resolución",
            value: ExpedientState.NoResolucion,
          },
          {
            label: "Resolución de negatoria",
            value: ExpedientState.ResolucionDeNegatoria,
          },
          {
            label: "Resolución favorable",
            value: ExpedientState.ResolucionFaborable,
          },
          {
            label: "No resolución",
            value: ExpedientState.NoResolucion,
          },
        ],
      },
      {
        label: "Guardado en",
        name: "guardadoEn",
        value: "",
        options: [
          {
            label: "Expediente vigente",
            value: StoredIn.CurrentExpedient,
          },
          {
            label: "En carpeta",
            value: StoredIn.EnCarpeta,
          },
          {
            label: "En físico",
            value: StoredIn.Fisico,
          },
        ],
      },
      {
        label: "Facturado",
        name: "facturado",
        value: "",
        options: [
          {
            label: "Facturado",
            value: 1,
          },
          {
            label: "No facturado",
            value: 0,
          },
        ],
      },
      {
        label: "Filtrar",
        name: "sort",
        value: "",
        options: [
          {
            label: "Nuevos primero",
            value: "createdAt:1",
          },
          {
            label: "Antiguos primero",
            value: "createdAt:-1",
          },
        ],
      },
      {
        label: "Area funcional",
        name: "areafuncional",
        value: "",
        options: functionalAreas,
      },
      {
        label: "Tipo",
        name: "tipo",
        value: "",
        options: expedientTypesNames,
      },
    ],
  });

  const onPreviousPage = () => {
    dispatch(getExpedients({ page: page - 1 }));
  };

  const onNextPage = () => {
    dispatch(getExpedients({ page: page + 1 }));
  };

  return (
    <>
      <DashboardLayout
        title={"Expedients"}
        filters={{}}
        search={{ search, setSearch }}
        pages={[
          {
            name: "Expedientes",
            href: "/expedients",
            current: true,
          },
        ]}
      >
        <HandleStatus status={status} data={data}>
          <ExpedientsList
            expedients={data}
            pagination={
              <Pagination
                limit={10}
                count={count}
                page={page}
                onNextPage={onNextPage}
                onPreviousPage={onPreviousPage}
              />
            }
          />
        </HandleStatus>
      </DashboardLayout>
    </>
  );
};

export default Expedients;
