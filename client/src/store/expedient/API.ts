import { Expedient } from "../../utils/types";
import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchExpedient(id: string) {
  return new Promise<{ data: Expedient }>((resolve) =>
    resolve(
      axios.get(`http://localhost/api/expedients/${id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
    )
  );
}

export function createExpedient(data) {
  return new Promise<{ data: Expedient }>((resolve) =>
    resolve(
      axios.post(`http://localhost/api/expedients`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
    )
  );
}

export function updateExpedient(id, data) {
  return new Promise<{ data: any }>((resolve) =>
    resolve(
      axios.patch(`http://localhost/api/expedients/${id}`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
    )
  );
}
