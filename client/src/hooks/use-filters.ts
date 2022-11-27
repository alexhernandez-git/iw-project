import { useFormik } from "formik";
import { Filters, SortOptions } from "../utils/types";

type Props = {
  callback: (filters: { [x: string]: any }[]) => void;
  filters: Filters[];
  sortOptions: SortOptions[];
};

export const useFilters = ({
  callback,
  filters = [],
  sortOptions = [],
}: Props): {
  resetFilters: () => void;
  filters: Filters[];
  sortOptions: SortOptions[];
} => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: filters.map((filter) => ({
      [filter.name]: null,
    })),
    onSubmit: (filters) => {
      callback(filters);
    },
  });

  const resetFilters = () => {
    formik.resetForm({});
  };

  return {
    resetFilters,
    filters,
    sortOptions,
  };
};
