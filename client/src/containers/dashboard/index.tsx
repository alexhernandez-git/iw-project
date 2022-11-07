import React, { useEffect } from "react";
import Layout from "../../layouts/layout";
import { ScaleIcon } from "@heroicons/react/24/outline";
import ExpedientsList from "../../components/expedients-list";
import Card from "../../components/card";
import { expedients } from "../../data";
import { useAppDispatch, useAppSelector } from "../../store";
import { getExpedients } from "../../store/expedients";
import HandleStatus from "../../components/handle-status";
const cards = [
  { name: "Expedientes", href: "#", icon: ScaleIcon, amount: "42" },
  { name: "Expedientes en progreso", href: "#", icon: ScaleIcon, amount: "12" },
  { name: "Expedientes terminados", href: "#", icon: ScaleIcon, amount: "30" },
  // More items...
];

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getExpedients({}));
  }, []);

  const {
    status,
    value: { page, size, count, data },
  } = useAppSelector((state) => state.expedients);

  return (
    <Layout>
      <div className="mt-8">
        <div className="">
          {/* <h2 className="text-lg font-medium leading-6 text-gray-900">
            Overview
          </h2> */}
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card */}
            {cards.map((card, index) => (
              <Card {...{ card, key: index }} />
            ))}
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl px-6 sm:px-0">
          <h2 className="text-lg font-medium leading-6 text-gray-900 px-1">
            Recent activity
          </h2>
          <HandleStatus status={status} data={data}>
            <ExpedientsList home expedients={data.slice(0, 5)} />
          </HandleStatus>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
