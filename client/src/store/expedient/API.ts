import { Expedient } from "../../utils/types";
import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchExpedient(id: string) {
  return new Promise<{ data: Expedient }>((resolve) =>
    resolve(
      axios.get(`http://3.253.49.204/api/expedients/${id}`, {
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
      axios.post(`http://3.253.49.204/api/expedients`, data, {
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
      axios.patch(`http://3.253.49.204/api/expedients/${id}/`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
    )
  );
}

export function updateFileExpedient(id, data) {
  return new Promise<{ data: any }>((resolve) =>
    resolve(
      axios.patch(`http://3.253.49.204/api/expedients/files/${id}`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
    )
  );
}

export function deleteExpedient(id) {
  return new Promise((resolve) =>
    resolve(
      axios.delete(`http://3.253.49.204/api/expedients/${id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
    )
  );
}
