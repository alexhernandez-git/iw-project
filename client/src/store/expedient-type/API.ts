import { ExpedientType } from "../../utils/types";
import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchExpedientType(id: string) {
  return new Promise<{
    data: ExpedientType;
  }>((resolve) =>
    resolve(
      axios.get(`http://185.23.117.129:8080/expedient-types/${id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
    )
  );
}

export function createExpedientType(data) {
  return new Promise<{ data: ExpedientType }>((resolve) =>
    resolve(
      axios.post("http://185.23.117.129:8080/expedient-types", data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
    )
  );
}

export function updateExpedientType(id, data) {
  return new Promise<{ data: ExpedientType }>((resolve) =>
    resolve(
      axios.patch(`http://185.23.117.129:8080/expedient-types/${id}`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
    )
  );
}