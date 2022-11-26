import { useMemo, useState } from "react";
import { Type } from "../../utils/types";
import Button from "../button";
import Item from "./partials/item";

type ItemType = {
  _id: string;
  title: string;
  subtitle: string;
  info: string;
  onClick: (_: any) => any;
  childrenDeep?: number;
  childrens: ItemType[];
};

type Props = {
  data: ItemType[];
};

const ItemsList = ({ data }: Props) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const getAllPosibleOpenItems = (items: ItemType[]): string[] | undefined => {
    if (!items) {
      return;
    }
    let allPosibleOpenItems =
      items &&
      items?.length > 0 &&
      items?.filter((item) => item.childrens && item.childrens.length > 0);
    let allPosible: string[] = [];
    allPosibleOpenItems &&
      allPosibleOpenItems?.length > 0 &&
      allPosibleOpenItems.forEach((item) => {
        allPosible = getAllPosibleOpenItems(item.childrens);
      });
    return [
      ...(allPosibleOpenItems && allPosibleOpenItems?.length > 0
        ? allPosibleOpenItems.map(({ _id }) => _id)
        : []),
      ...allPosible,
    ];
  };

  const handleToggleOpenAll = () => {
    const allPosibleOpenItems = getAllPosibleOpenItems(data);
    setOpenItems(openAll ? [] : allPosibleOpenItems);
  };

  const handleToggleItem = (e: any, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    const index = openItems.indexOf(id);

    const copyOfOpenItems = [...openItems];
    if (index >= 0) {
      copyOfOpenItems.splice(index, copyOfOpenItems?.length);
    } else {
      copyOfOpenItems.push(id);
    }
    setOpenItems(copyOfOpenItems);
  };

  const openAll = useMemo(
    () => getAllPosibleOpenItems(data)?.length === openItems.length,
    [data, openItems, getAllPosibleOpenItems]
  );

  return (
    <div className="overflow-hidden bg-white p-3 shadow sm:rounded-md">
      {data ? (
        <>
          <div className="mb-4 flex justify-end">
            <Button type={Type.Secondary} onClick={handleToggleOpenAll}>
              {openAll ? "Cerrar todos" : "Abrir todos"}
            </Button>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {data &&
              data?.length > 0 &&
              data.map((item) => (
                <Item
                  {...item}
                  selected={true}
                  key={item.title}
                  openItems={openItems}
                  handleToggleItem={handleToggleItem}
                />
              ))}
          </ul>
        </>
      ) : (
        <span className="text-sm text-gray-500">
          No se han encontrado tipos de expediente
        </span>
      )}
    </div>
  );
};

export default ItemsList;
