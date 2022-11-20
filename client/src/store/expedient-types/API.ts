import { expedientTypes } from "../../data";
import { ExpedientType } from "../../utils/types";
import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchExpedientTypes({
  page,
  search,
  getAll,
}: {
  page: number;
  search: string;
  getAll: boolean;
}) {
  return new Promise<{
    data: {
      count: number;
      page: number;
      size: number;
      data: ExpedientType[];
    };
  }>((resolve) =>
    getAll
      ? resolve(
          axios.get("http://localhost:8080/expedient-types", {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          })
        )
      : resolve(
          axios.get(
            `http://localhost:8080/expedient-types?page=${page}&limit=10`,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              },
            }
          )
        )
  );
}
