import React, { useEffect } from "react";
import ExpedientsTypesList from "../../components/expedients-types-list";
import DashboardLayout from "../../layouts/layout";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/use-search";
import { useDispatch, useSelector } from "react-redux";
import { getExpedientTypes } from "../../store/expedient-types";
import { RootState } from "../../store";
import HandleStatus from "../../components/handle-status";

const ExpedientsTypes = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpedientTypes({}));
  }, []);

  const { status, value: expedientTypes } = useSelector(
    (state: RootState) => state.expedientTypes
  );

  const [search, setSearch] = useSearch({
    callback: (searchValue) => {
      console.log("text-changed expedients types", searchValue);
    },
  });
  return (
    <DashboardLayout
      title={"Tipos de expediente"}
      button={{
        label: "Crear",
        onClick: () => navigate("/expedients-types/new"),
      }}
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
        <ExpedientsTypesList {...{ expedientTypes }} />
      </HandleStatus>
    </DashboardLayout>
  );
};

export default ExpedientsTypes;
