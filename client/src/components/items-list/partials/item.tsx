import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useMemo, useState } from "react";

type ItemType = {
  _id: string;
  title: string;
  subtitle: string;
  info: string;
  onClick: (_: any) => any;
  childrenDeep: number;
  childrens: ItemType[];
  openItems: string[];
  handleToggleItem: (id: string) => void;
};

type Props = ItemType;

const Item = ({
  _id,
  title,
  onClick,
  subtitle,
  openItems,
  handleToggleItem,
  info,
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
    <li key={title} className="p-2">
      <span
        onClick={() => haveChildrens && handleToggleItem(_id)}
        className={`block cursor-pointer hover:bg-gray-50 `}
      >
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
          {haveChildrens && (
            <div>
              {isOpen ? (
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              ) : (
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </div>
          )}
        </div>
      </span>
      {isOpen && haveChildrens && (
        <ul className=" shadow-inner sm:rounded-m divide-y m-2 divide-gray-200">
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
