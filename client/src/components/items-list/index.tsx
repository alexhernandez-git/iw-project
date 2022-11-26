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

  const getAllPosibleOpenItems = (items: ItemType[]): string[] => {
    let allPosibleOpenItems = items.filter(
      (item) => item.childrens && item.childrens.length > 0
    );
    let allPosible: string[] = [];
    allPosibleOpenItems.forEach((item) => {
      allPosible = getAllPosibleOpenItems(item.childrens);
    });
    return [...allPosibleOpenItems.map(({ _id }) => _id), ...allPosible];
  };

  const handleToggleOpenAll = () => {
    const allPosibleOpenItems = getAllPosibleOpenItems(data);
    console.log({ allPosibleOpenItems });
    console.log({ openItems });
    setOpenItems(openAll ? [] : allPosibleOpenItems);
  };

  const handleToggleItem = (id: string) => {
    const index = openItems.indexOf(id);

    const copyOfOpenItems = [...openItems];
    if (index >= 0) {
      copyOfOpenItems.splice(index, copyOfOpenItems.length);
    } else {
      copyOfOpenItems.push(id);
    }
    setOpenItems(copyOfOpenItems);
  };

  const openAll = useMemo(
    () => getAllPosibleOpenItems(data).length === openItems.length,
    [data, openItems]
  );

  console.log({ openItems });

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <div className="mb-4 flex justify-end">
        <Button type={Type.Secondary} onClick={handleToggleOpenAll}>
          {openAll ? "Close all" : "Open all"}
        </Button>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {data.map((item) => (
          <Item
            {...item}
            key={item.title}
            openItems={openItems}
            handleToggleItem={handleToggleItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
