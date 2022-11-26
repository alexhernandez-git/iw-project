import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  callback: (search: string) => void;
};

export const useSearch = ({
  callback,
}: Props): [string | undefined, Dispatch<SetStateAction<undefined>>] => {
  const [search, setSearch] = useState();

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const timer = setTimeout(() => setSearch(debouncedSearch), 500);
    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      callback(search);
    }
  }, [search]);
  return [debouncedSearch, setDebouncedSearch];
};
