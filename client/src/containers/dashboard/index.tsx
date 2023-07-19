import React, { useEffect } from "react";
import Layout from "../../layouts/layout";
import { ScaleIcon } from "@heroicons/react/24/outline";
import ExpedientsList from "../../components/expedients-list";
import Card from "../../components/card";
import { expedients } from "../../data";
import { useAppDispatch, useAppSelector } from "../../store";
import { getExpedients } from "../../store/expedients";
import HandleStatus from "../../components/handle-status";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getExpedients({}));
  }, []);

  const {
    status: userStatus,
    statistics: {
      expedientesCount,
      expedientesEnProgresoCount,
      expedientesFinalizadosCount,
    },
  } = useAppSelector((state) => state.user);

  const {
    status,
    value: { page, size, count, data },
  } = useAppSelector((state) => state.expedients);

  const cards = [
    {
      name: "Expedientes",
      href: "/expedients",
      icon: ScaleIcon,
      amount: expedientesCount,
    },
    {
      name: "Expedientes en progreso",
      href: "/expedients",
      icon: ScaleIcon,
      amount: expedientesEnProgresoCount,
    },
    {
      name: "Expedientes terminados",
      href: "/expedients",
      icon: ScaleIcon,
      amount: expedientesFinalizadosCount,
    },
  ];

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
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Expedientes próximos a vencer
          </h2>
          <HandleStatus status={status} data={data.expedientes}>
            <ExpedientsList
              home
              expedients={data.expedientes.slice(0, 5)}
              vinculados={data.vinculados}
            />
          </HandleStatus>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
