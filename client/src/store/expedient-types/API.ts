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
          axios.get(`http://localhost/api/expedient-types`, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          })
        )
      : resolve(
          axios.get(
            `http://localhost/api/expedient-types?page=${page}&limit=10&search=${search}`,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              },
            }
          )
        )
  );
}

export function fetchExpedientTypesByParent({
  parent,
}: {
  parent: string | null;
}) {
  return new Promise<{
    data: ExpedientType[];
  }>((resolve) =>
    resolve(
      axios.get(
        `http://localhost/api/expedient-types/parent${
          parent ? "?parent=" + parent : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
    )
  );
}
export function fetchExpedientTypesAll({ search }: { search: string | null }) {
  return new Promise<{
    data: ExpedientType[];
  }>((resolve) =>
    resolve(
      axios.get(
        `http://localhost/api/expedient-types/all${
          search ? `?search=${search}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
    )
  );
}

export function fetchExpedientTypesNames() {
  return new Promise<{
    data: ExpedientType[];
  }>((resolve) =>
    resolve(
      axios.get(`http://localhost/api/expedient-types/names`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
    )
  );
}

export function fetchExpedientTypesFunctionalAreas() {
  return new Promise<{
    data: ExpedientType[];
  }>((resolve) =>
    resolve(
      axios.get(`http://localhost/api/expedient-types/funcional-areas`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
    )
  );
}
