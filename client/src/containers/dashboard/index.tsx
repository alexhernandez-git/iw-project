import React from "react";
import Layout from "../../layouts/layout";
import { ScaleIcon } from "@heroicons/react/24/outline";
import ProceduresList, {
  ProceduresListSmall,
} from "../../components/procedures-list";
import Card from "../../components/card";

const cards = [
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  // More items...
];

const procedures = [
  {
    id: 1,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "success",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  // More procedures...
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Overview
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card */}
            {cards.map((card, index) => (
              <Card {...{ card, key: index }} />
            ))}
          </div>
        </div>

        <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
          Recent activity
        </h2>

        {/* Activity list (smallest breakpoint only) */}
        <ProceduresListSmall {...{ procedures }} />

        {/* Activity table (small breakpoint and up) */}
        <ProceduresList {...{ procedures }} />
      </div>
    </Layout>
  );
};

export default Dashboard;
