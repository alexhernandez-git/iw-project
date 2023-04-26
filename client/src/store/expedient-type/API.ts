import { ExpedientType } from "../../utils/types";
import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchExpedientType(id: string) {
  return new Promise<{
    data: ExpedientType;
  }>((resolve) =>
    resolve(
      axios.get(`http://34.244.188.175/api/expedient-types/${id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(`token`)}`,
        },
      })
    )
  );
}

export function createExpedientType(data) {
  return new Promise<{ data: ExpedientType }>((resolve) =>
    resolve(
      axios.post(`http://34.244.188.175/api/expedient-types`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(`token`)}`,
        },
      })
    )
  );
}

export function updateExpedientType(id, data) {
  return new Promise<{ data: ExpedientType }>((resolve) =>
    resolve(
      axios.patch(`http://34.244.188.175/api/expedient-types/${id}/`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(`token`)}`,
          "Content-Type": "multipart/form-data",
        },
      })
    )
  );
}

export function updateFileExpedientType(id, data) {
  return new Promise<{ data: { expedientType: ExpedientType } }>((resolve) =>
    resolve(
      axios.patch(
        `http://34.244.188.175/api/expedient-types/files/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
    )
  );
}

export function deleteExpedientType(id) {
  return new Promise((resolve) =>
    resolve(
      axios.delete(`http://34.244.188.175/api/expedient-types/${id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
    )
  );
}
