import React from "react";
import Card from "./partials/card";

type Props = {
  data: { value: string; onClick?: (_: any) => any }[];
};

const List = ({ data }: Props) => {
  return (
    <>
      {data && data?.length > 0 ? (
        <ul
          role="list"
          className="divide-y divide-gray-200 rounded-md border border-gray-200"
        >
          {data.map((item) => (
            <Card {...item} />
          ))}
        </ul>
      ) : (
        <span className="text-sm text-gray-500">No hay datos</span>
      )}
    </>
  );
};

export default List;
