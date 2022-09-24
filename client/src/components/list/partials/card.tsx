import React from "react";
import { Type } from "../../../utils/types";
import Button from "../../button";

type Props = {
  value: string;
  onClick?: (_: any) => any;
};

const Card = ({ value, onClick }: Props) => {
  return (
    <li className="flex items-center justify-between p-3 text-sm">
      <div className="flex w-0 flex-1 items-center">
        <span className="w-0 flex-1 truncate">{value}</span>
      </div>
      <div className="ml-4 flex-shrink-0">
        <Button type={Type.Secondary} onClick={onClick}>
          Ir
        </Button>
      </div>
    </li>
  );
};

export default Card;
