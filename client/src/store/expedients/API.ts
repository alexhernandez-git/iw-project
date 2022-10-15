import { expedients, expedient } from "../../data";
import { Expedient } from "../../utils/types";

// A mock function to mimic making an async request for data
export function fetchExpedients({
  page,
  search,
}: {
  page?: number;
  search?: string;
}) {
  return new Promise<{
    data: {
      count: number;
      page: number;
      size: number;
      data: Expedient[];
    };
  }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: {
            count: 100,
            page: 1,
            size: 10,
            data: expedients,
          },
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
