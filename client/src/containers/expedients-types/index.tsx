import React, { useEffect } from "react";
import ExpedientsTypesList from "../../components/expedients-types-list";
import DashboardLayout from "../../layouts/layout";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/use-search";
import { useDispatch, useSelector } from "react-redux";
import { getExpedientTypes } from "../../store/expedient-types";
import { RootState } from "../../store";
import HandleStatus from "../../components/handle-status";
import { UserRole } from "../../utils/types";
import Pagination from "../../components/pagination";

const ExpedientsTypes = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [search, setSearch] = useSearch({
    callback: (searchValue) => {
      dispatch(getExpedientTypes({ search: searchValue }));
    },
  });

  useEffect(() => {
    if (!search || search.split(" ").join("") === "") {
      dispatch(getExpedientTypes({}));
    }
  }, [search]);

  const onPreviousPage = () => {
    dispatch(getExpedientTypes({ page: page - 1 }));
  };

  const onNextPage = () => {
    dispatch(getExpedientTypes({ page: page + 1 }));
  };

  const { status, value: expedientTypes } = useSelector(
    (state: RootState) => state.expedientTypes
  );

  const { status: userStatus, value: user } = useSelector(
    (state: RootState) => state.user
  );

  const { data, count, size, page } = expedientTypes;

  return (
    <DashboardLayout
      title={"Tipos de tramites"}
      button={
        [UserRole.Admin, UserRole.SuperAdmin].includes(user?.role) && {
          label: "Crear nuevo",
          onClick: () => navigate("/expedients-types/new"),
        }
      }
      pages={[
        {
          name: "Tipos de tramites",
          href: "/expedients-types",
          current: true,
        },
      ]}
      search={{ search, setSearch }}
    >
      <HandleStatus status={status} data={expedientTypes?.data}>
        <ExpedientsTypesList
          {...{ expedientTypes: data }}
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
  );
};

export default ExpedientsTypes;
