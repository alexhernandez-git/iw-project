import { expedientTypes } from "../../data";
import { ExpedientType } from "../../utils/types";

// A mock function to mimic making an async request for data
export function fetchExpedientType(id: string) {
  return new Promise<{
    data: ExpedientType;
  }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: expedientTypes[0],
        }),
      500
    )
  );
}

export function createExpedientType(data) {
  return new Promise<{ data: ExpedientType }>((resolve) =>
    setTimeout(() => resolve({ data: expedientTypes[0] }), 500)
  );
}

export function updateExpedientType(id, data) {
  return new Promise<{ data: ExpedientType }>((resolve) =>
    setTimeout(() => resolve({ data: expedientTypes[0] }), 500)
  );
}
