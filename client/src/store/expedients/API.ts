import { Expedient } from "../../utils/types";
import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchExpedients({
  page,
  search,
}: {
  page: number;
  search: string;
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
      axios.get("http://185.23.117.129:8080/expedients", {
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
      axios.post("http://185.23.117.129:8080/expedients", data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
    )
  );
}
