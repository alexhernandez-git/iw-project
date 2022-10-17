import { expedient } from "../../data";
import { Expedient } from "../../utils/types";

// A mock function to mimic making an async request for data
export function fetchExpedient(id: string) {
  return new Promise<{
    data: Expedient;
  }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: expedient,
        }),
      500
    )
  );
}

export function createExpedient(data) {
  return new Promise<{ data: Expedient }>((resolve) =>
    setTimeout(() => resolve({ data: expedient }), 500)
  );
}

export function updateExpedient(id, data) {
  return new Promise<{ data: Expedient }>((resolve) =>
    setTimeout(() => resolve({ data: expedient }), 500)
  );
}
