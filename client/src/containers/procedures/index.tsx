import React from "react";
import ProceduresList, {
  ProceduresListSmall,
} from "../../components/procedures-list";
import DashboardLayout from "../../layouts/dashboard-layout";

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

const Procedures = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <ProceduresList {...{ procedures }} />
        <ProceduresListSmall {...{ procedures }} />
      </div>
    </DashboardLayout>
  );
};

export default Procedures;
