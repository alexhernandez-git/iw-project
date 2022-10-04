import React from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import DescriptionRow from "./partials/description-row";
import { ListItemType, Type } from "../../utils/types";
import List from "../list";
import Button from "../button";

type Props = {
  title: string;
  description: string;
  list: [
    {
      type: ListItemType;
      label: string;
      value:
        | string
        | {
            label: string | number;
            onClick?: (_: any) => any;
          }
        | Array<{ value: string; onClick?: (_: any) => any }>;
    }
  ];
};

const DescriptionList = ({ title, description, list }: Props) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {list.map((item, index) => (
            <DescriptionRow
              {...{
                label: item.label,
                type: index % 2 === 0 ? Type.Primary : Type.Secondary,
              }}
            >
              {item.type === ListItemType.Text && item?.value}
              {item.type === ListItemType.Button && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <span className="w-0 flex-1 truncate">
                      {item.value?.label}
                    </span>
                  </div>
                  {item?.value?.onClick && (
                    <div className="ml-4 flex-shrink-0">
                      <Button
                        type={Type.Secondary}
                        onClick={item?.value.onClick}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Ir
                      </Button>
                    </div>
                  )}
                </div>
              )}
              {item.type === ListItemType.List && <List data={item.value} />}
            </DescriptionRow>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default DescriptionList;
