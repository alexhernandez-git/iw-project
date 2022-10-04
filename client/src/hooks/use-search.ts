import { useEffect, useState } from "react";

type Props = {
  callback: (_?: any) => any;
};

export const useSearch = ({ callback }: Props) => {
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
