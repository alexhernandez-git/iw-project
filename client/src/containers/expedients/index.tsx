import React from "react";
import ExpedientsList, {
  ExpedientsListSmall,
} from "../../components/expedients-list";
import DashboardLayout from "../../layouts/layout";
import { expedients } from "../../data";

const Expedients = () => {
  return (
    <DashboardLayout title={"Expedients"}>
      <ExpedientsList {...{ expedients }} />
      <ExpedientsListSmall {...{ expedients }} />
    </DashboardLayout>
  );
};

export default Expedients;
