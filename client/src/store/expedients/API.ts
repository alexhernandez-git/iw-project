import { Expedient } from "../../utils/types";
import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchExpedients({
  page,
  search,
  filters,
}: {
  page: number;
  search: string;
  filters: { [x: string]: string }[];
}) {
  let filtersQuery = "";
  for (var i in filters) {
    console.log(i);
    for (var key in filters[i]) {
      console.log(key + ": " + filters[i][key]);
      filtersQuery += `&${key}=${filters[i][key]}`;
    }
  }

  return new Promise<{
    data: {
      count: number;
      page: number;
      size: number;
      data: Expedient[];
    };
  }>((resolve) =>
    resolve(
      axios.get(
        `http://localhost:8080/expedients?page=${page}&limit=10&search=${search}${filtersQuery}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
    )
  );
}

export function createExpedient(data) {
  console.log({ data });
  return new Promise<{ data: Expedient }>((resolve) =>
    resolve(
      axios.post(`http://localhost:8080/expedients`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
    )
  );
}
