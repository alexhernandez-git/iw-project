/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";
import { ReactElement } from "react";
import { ExpedientType } from "../../utils/types";
import ExpedientsTypesCard from "./partials/expedients-types-card";

const positions = [
  {
    id: 1,
    title: "Extrangeria",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 2,
    title: "Hijo de extrangeria",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 3,
    title: "User Interface Designer",
    type: "Full-time",
    location: "Remote",
    department: "Design",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
  },
];

type Props = {
  expedientTypes: ExpedientType[];
  pagination: ReactElement<any, any>;
};

export default function ExpedientsTypesList({
  expedientTypes,
  pagination,
}: Props) {
  console.log({ expedientTypes });
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {expedientTypes &&
          expedientTypes.map((expedientType) => (
            <ExpedientsTypesCard expedientType={expedientType} />
          ))}
      </ul>
      {pagination && pagination}
    </div>
  );
}
