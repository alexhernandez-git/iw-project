import React, { useCallback, useEffect, useState } from "react";
import ExpedientsList from "../../components/expedients-list";
import DashboardLayout from "../../layouts/layout";
import { useSearch } from "../../hooks/use-search";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../store";
import {
  ExpedientState,
  SortOptionsValues,
  StoredIn,
  User,
} from "../../utils/types";
import { getExpedients } from "../../store/expedients";
import Pagination from "../../components/pagination";
import HandleStatus from "../../components/handle-status";
import { useFilters } from "../../hooks/use-filters";
import {
  getExpedientTypesFunctionalAreas,
  getExpedientTypesNames,
} from "../../store/expedient-types";
import { getUsers } from "../../store/users";
import useUserRole from "../../hooks/use-user-role";

const Expedients = () => {
  const {
    status,
    value: { page, size, count, data },
  } = useSelector((state: RootState) => state.expedients);

  const { value: user, status: useStatus } = useAppSelector(
    (state) => state.user
  );

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

  const [partners, setPartners] = useState<
    {
      label: string;
      value: string;
      checked: boolean;
    }[]
  >([]);

  const { isAdmin, isSuperAdmin } = useUserRole();

  useEffect(() => {
    if (user) {
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
      if (isAdmin || isSuperAdmin) {
        dispatch(getUsers())
          .unwrap()
          .then((data: { nombre: string; _id: string }[]) => {
            setPartners(
              data
                .filter((item: User) => item._id !== user._id)
                .map((item: User) => ({
                  label: item?.firstName + " " + item?.lastName,
                  value: item?._id,
                  checked: false,
                }))
            );
          });
      }
    }
  }, [user]);

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
      {
        name: SortOptionsValues.LegalTermCloseToDeadline,
        label: "Plazo legal cercano",
        current: false,
      },
    ],
    filters:
      isAdmin || isSuperAdmin
        ? [
            {
              label: "Estado",
              name: "estado",
              options: [
                {
                  label: "Pendiente",
                  value: ExpedientState.DocumentacionPendiente,
                  checked: false,
                },
                {
                  label: "Para cursar",
                  value: ExpedientState.DocumentacionCompleta,
                  checked: false,
                },
                {
                  label: "Cursado no concluido",
                  value: ExpedientState.ExpedientCursadoNoConcluido,
                  checked: false,
                },
                {
                  label: "Expediente concluido",
                  value: ExpedientState.Concluido,
                  checked: false,
                },
                {
                  label: "Resolución denegatoria",
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
              label: "Colaboradores",
              name: "partners",
              options: partners,
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
          ]
        : [
            {
              label: "Estado",
              name: "estado",
              options: [
                {
                  label: "Pendiente",
                  value: ExpedientState.DocumentacionPendiente,
                  checked: false,
                },
                {
                  label: "Para cursar",
                  value: ExpedientState.DocumentacionCompleta,
                  checked: false,
                },
                {
                  label: "Cursado no concluido",
                  value: ExpedientState.ExpedientCursadoNoConcluido,
                  checked: false,
                },
                {
                  label: "No resolución",
                  value: ExpedientState.NoResolucion,
                  checked: false,
                },
                {
                  label: "Resolución denegatoria",
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
