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
  filters: { [x: string]: string[] };
}) {
  return new Promise<{
    data: {
      count: number;
      page: number;
      size: number;
      data: Expedient[];
    };
  }>((resolve) =>
    resolve(
      axios.get(`http://localhost:8000/api/expedients`, {
        params: {
          page,
          limit: 10,
          search,
          ...filters,
        },
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
    )
  );
}

export function createExpedient(data) {
  console.log({ data });
  return new Promise<{ data: Expedient }>((resolve) =>
    resolve(
      axios.post(`http://localhost:8000/api/expedients`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
    )
  );
}
