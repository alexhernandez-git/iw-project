import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../../button";
import ExpedientLogo from "../../../images/documentos.png";
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

  return (
    <li key={title} className={`${childrenDeep > 0 && "ml-10"}`}>
      <span
        className={`block bg-gray-50 hover:bg-gray-100 m-1 cursor-pointer`}
        onClick={(e) => handleToggleItem(e, _id)}
      >
        <div className="flex items-center p-2">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="min-w-0 flex-1 pr-4">
              <div className="flex items-center cursor-pointer">
                {haveChildrens && (
                  <div className="flex justify-end items-center mr-2">
                    <div>
                      <div>
                        {isOpen ? (
                          <ChevronDownIcon
                            className="h-4 w-4 text-gray-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronRightIcon
                            className="h-4 w-4 text-gray-500"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <p
                  className="truncate text-sm font-medium text-esan-color cursor-pointer"
                  onClick={button.onClick}
                >
                  {title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </span>

      {isOpen && haveChildrens && (
        <ul className="sm:rounded-m">
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
