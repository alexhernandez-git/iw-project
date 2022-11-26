import { useFormik } from "formik";
import { Filters } from "../utils/types";

type Props = {
  callback: (filters: { [x: string]: string }[]) => void;
  filters: Filters[];
};

export const useFilters = ({
  callback,
  filters = [],
}: Props): {
  resetFilters: () => void;
  filters: Filters[];
} => {
  const formik = useFormik({
    initialValues: filters.map((filter) => ({
      [filter.name]: filter.value,
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
  };
};
