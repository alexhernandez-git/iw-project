import React, { useEffect } from "react";
import ExpedientsList from "../../components/expedients-list";
import DashboardLayout from "../../layouts/layout";
import { useSearch } from "../../hooks/use-search";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../store";
import { SliceState } from "../../utils/types";
import Loading from "../../components/loading";
import { getExpedients } from "../../store/expedients";
import Pagination from "../../components/pagination";
import HandleStatus from "../../components/handle-status";

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
