import React from "react";
import Card from "./partials/card";

type Props = {
  data: { value: string; onClick?: (_: any) => any }[];
};

const List = ({ data }: Props) => {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 rounded-md border border-gray-200"
    >
      {data.map((item) => (
        <Card {...item} />
      ))}
    </ul>
  );
};

export default List;
