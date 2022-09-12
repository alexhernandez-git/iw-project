import React from "react";
import ExpedientsList, {
  ExpedientsListSmall,
} from "../../components/expedients-list";
import DashboardLayout from "../../layouts/layout";
import { expedients } from "../../data";

const Expedients = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <ExpedientsList {...{ expedients }} />
        <ExpedientsListSmall {...{ expedients }} />
      </div>
    </DashboardLayout>
  );
};

export default Expedients;
