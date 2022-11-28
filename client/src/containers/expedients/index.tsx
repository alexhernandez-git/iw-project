import React, { useCallback, useEffect, useMemo, useState } from "react";
import ExpedientsList from "../../components/expedients-list";
import DashboardLayout from "../../layouts/layout";
import { useSearch } from "../../hooks/use-search";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../store";
import { ExpedientState, SortOptionsValues, StoredIn } from "../../utils/types";
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

  const { value: user } = useAppSelector((state) => state.user);

  const dispatch = useDispatch();

  const [search, setSearch] = useSearch({
    callback: (searchValue) => {
      dispatch(getExpedients({ search: searchValue }));
    },
  });

  useEffect(() => {
    if (!search || search.split(" ").join("") === "") {
      dispatch(getExpedients({}));
    }
  }, [search]);

  const [functionalAreas, setFunctionalAreas] = useState<
    {
      label: string;
      value: string;
      checked: boolean;
    }[]
  >([]);

  const [expedientTypesNames, setExpedientTypesNames] = useState<
    {
      label: string;
      value: string;
      checked: boolean;
    }[]
  >([]);

  useEffect(() => {
    dispatch(getExpedientTypesFunctionalAreas())
      .unwrap()
      .then((data: { nombre: string; _id: string }[]) => {
        setFunctionalAreas(
          data.map((item) => ({
            label: item.nombre,
            value: item._id,
            checked: false,
          }))
        );
      });
    dispatch(getExpedientTypesNames())
      .unwrap()
      .then((data: { nombre: string; _id: string }[]) => {
        setExpedientTypesNames(
          data.map((item) => ({
            label: item.nombre,
            value: item._id,
            checked: false,
          }))
        );
      });
  }, []);

  const { onFiltersChange, filters, sortOptions } = useFilters({
    callback: (filters) => {
      dispatch(getExpedients({ search, filters }));
    },
    sortOptions: [
      {
        name: SortOptionsValues.NewestFirst,
        label: "Nuevos primero",
        current: true,
      },
      {
        name: SortOptionsValues.OldestFirst,
        label: "Antiguos primero",
        current: false,
      },
    ],
    filters: [
      {
        label: "Estado",
        name: "estado",
        options: [
          {
            label: "Documentación pendiente",
            value: ExpedientState.DocumentacionPendiente,
            checked: false,
          },
          {
            label: "Documentación completa",
            value: ExpedientState.DocumentacionCompleta,
            checked: false,
          },
          {
            label: "Expediente cursado no concluido",
            value: ExpedientState.ExpedientCursadoNoConcluido,
            checked: false,
          },
          {
            label: "No resolución",
            value: ExpedientState.NoResolucion,
            checked: false,
          },
          {
            label: "Resolución de negatoria",
            value: ExpedientState.ResolucionDeNegatoria,
            checked: false,
          },
          {
            label: "Resolución favorable",
            value: ExpedientState.ResolucionFaborable,
            checked: false,
          },
          {
            label: "No resolución",
            value: ExpedientState.NoResolucion,
            checked: false,
          },
        ],
      },
      {
        label: "Guardado en",
        name: "guardadoen",
        options: [
          {
            label: "Expediente vigente",
            value: StoredIn.CurrentExpedient,
            checked: false,
          },
          {
            label: "En carpeta",
            value: StoredIn.EnCarpeta,
            checked: false,
          },
          {
            label: "En físico",
            value: StoredIn.Fisico,
            checked: false,
          },
        ],
      },
      {
        label: "Facturado",
        name: "facturado",
        options: [
          {
            label: "Facturado",
            checked: false,
            value: true,
          },
          {
            label: "No facturado",
            checked: false,
            value: false,
          },
        ],
      },
      {
        label: "Area funcional",
        name: "areafuncional",
        options: functionalAreas,
      },
      {
        label: "Tipo",
        name: "tipo",
        options: expedientTypesNames,
      },
    ],
  });

  const onPreviousPage = useCallback(() => {
    dispatch(getExpedients({ page: page - 1 }));
  }, [dispatch, page]);

  const onNextPage = useCallback(() => {
    dispatch(getExpedients({ page: page + 1 }));
  }, [dispatch, page]);

  return (
    <>
      <DashboardLayout
        title={"Expedients"}
        filters={{
          filters,
          sortOptions,
          onFiltersChange,
        }}
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
