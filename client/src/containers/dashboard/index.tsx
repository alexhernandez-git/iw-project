import React from "react";
import Layout from "../../layouts/layout";
import { ScaleIcon } from "@heroicons/react/24/outline";
import ExpedientsList, {
  ExpedientsListSmall,
} from "../../components/expedients-list";
import Card from "../../components/card";
import { expedients } from "../../data";
const cards = [
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  // More items...
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
        <ExpedientsListSmall {...{ expedients }} />

        {/* Activity table (small breakpoint and up) */}
        <ExpedientsList {...{ expedients }} />
      </div>
    </Layout>
  );
};

export default Dashboard;
