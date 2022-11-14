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

  useEffect(() => {
    dispatch(getExpedientTypes({}));
  }, []);

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

  const [search, setSearch] = useSearch({
    callback: (searchValue) => {
      console.log("text-changed expedients types", searchValue);
    },
  });
  return (
    <DashboardLayout
      title={"Tipos de expediente"}
      button={
        [UserRole.SuperAdmin, UserRole.SuperAdmin].includes(user?.role) && {
          label: "Crear nuevo",
          onClick: () => navigate("/expedients-types/new"),
        }
      }
      pages={[
        {
          name: "Tipos de expediente",
          href: "/expedients-types",
          current: true,
        },
      ]}
      search={{ search, setSearch }}
    >
      <HandleStatus status={status} data={expedientTypes}>
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
