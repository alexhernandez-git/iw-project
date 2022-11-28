import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { Filters, SortOptions } from "../utils/types";

type Props = {
  callback: (filters: { [x: string]: any }) => void;
  filters: Filters[];
  sortOptions: SortOptions[];
};

export const useFilters = ({
  callback,
  filters: filtersDefault = [],
  sortOptions: sortOptionsDefault = [],
}: Props): {
  filters: Filters[];
  sortOptions: SortOptions[];
  onFiltersChange: (
    name: string,
    value: string | number | boolean,
    checked?: string
  ) => void;
} => {
  const {
    values: { sortOptions, filters },
    setFieldValue,
  } = useFormik({
    initialValues: {
      sortOptions: sortOptionsDefault,
      filters: filtersDefault,
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const [result, setResult] = useState<{ [x: string]: any[] }>({
    sort: [sortOptions.filter((option) => option.current)[0]?.name],
  });

  const onFiltersChange = useCallback(
    (name: string, value: string, checked?: string) => {
      const copyOfResult = { ...result };
      if (name === "sort") {
        setFieldValue(
          "sortOptions",
          sortOptions.map((sortOption) =>
            checked && sortOption.name === value
              ? { ...sortOption, checked: true }
              : { ...sortOption, checked: false }
          )
        );

        // Update result
        copyOfResult[name] = [value];
        setResult(copyOfResult);
      } else {
        const newFilters = filters.map((filter) =>
          name === filter.name
            ? {
                ...filter,
                options: filter.options.map((option) =>
                  value === option.value
                    ? {
                        ...option,
                        checked,
                      }
                    : option
                ),
              }
            : filter
        );
        setFieldValue("filters", newFilters);
        // Update result
        if (checked) {
          if (name in copyOfResult) {
            if (
              !copyOfResult[name].find(
                (valueItem: string) => valueItem === value
              )
            ) {
              copyOfResult[name] = [...copyOfResult[name], value];
            }
          } else {
            copyOfResult[name] = [value];
          }
        } else {
          if (name in copyOfResult) {
            copyOfResult[name] = copyOfResult[name].filter(
              (valueItem: string) => valueItem !== value
            );
            if (copyOfResult[name].length === 0) {
              delete copyOfResult[name];
            }
          }
        }

        setResult(copyOfResult);
        callback(copyOfResult);
      }
    },
    [callback, setResult, result, filters, sortOptions, setFieldValue]
  );

  return {
    filters,
    sortOptions,
    onFiltersChange,
  };
};
