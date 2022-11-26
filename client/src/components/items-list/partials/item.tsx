import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../../button";

type ItemType = {
  _id: string;
  title: string;
  subtitle: string;
  info: string;
  childrenDeep: number;
  childrens: ItemType[];
  selected: boolean;
  button: {
    onClick: (_: any) => any;
    label: string;
  };
  openItems: string[];
  handleToggleItem: (e: any, id: string) => void;
};

type Props = ItemType;

const Item = ({
  _id,
  title,
  subtitle,
  openItems,
  handleToggleItem,
  info,
  button,
  childrens,
  childrenDeep = 0,
}: Props) => {
  const [isOpen, setIsOpen] = useState(
    openItems && openItems.some((item) => item === _id)
  );

  useEffect(() => {
    setIsOpen(openItems && openItems.some((item) => item === _id));
  }, [openItems, _id]);

  const haveChildrens = useMemo(
    () => childrens && childrens.length > 0,
    [childrens]
  );

  console.log({ haveChildrens });

  return (
    <li key={title} className="p-1 shadow">
      <span className={`block`}>
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="min-w-0 flex-1 pr-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <p className="truncate text-sm font-medium text-esan-color">
                  {title}
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="truncate">{subtitle}</span>
                </p>
              </div>
              <div className="hidden md:block">
                <div>
                  <p className="text-sm text-gray-900">{info}</p>
                </div>
              </div>
            </div>
          </div>
          {button && (
            <div>
              <Button onClick={button.onClick}>{button.label}</Button>
            </div>
          )}
        </div>
      </span>
      {haveChildrens && (
        <div className="flex justify-end items-center">
          <div
            onClick={(e) => handleToggleItem(e, _id)}
            className="flex flex-1 shadow justify-between items-center cursor-pointer text-esan-color bg-white hover:opacity-70 rounded p-3"
          >
            <span className="flex items-center text-xs mr-2">
              {isOpen
                ? `Esconder ${childrens.length} hijos`
                : `Desplegar ${childrens.length} hijos`}
            </span>
            <div>
              {isOpen ? (
                <ChevronDownIcon
                  className="h-4 w-4 text-esan-color"
                  aria-hidden="true"
                />
              ) : (
                <ChevronRightIcon
                  className="h-4 w-4 text-esan-color"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>
      )}
      {isOpen && haveChildrens && (
        <ul className=" shadow-inner sm:rounded-m divide-y m-1 divide-gray-200">
          {childrens.map((item) => (
            <Item
              {...item}
              childrenDeep={Number(childrenDeep) + 1}
              key={item.title}
              openItems={openItems}
              handleToggleItem={handleToggleItem}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Item;
