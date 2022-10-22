import { expedientTypes } from "../../data";
import { ExpedientType } from "../../utils/types";

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
    setTimeout(
      () =>
        getAll
          ? resolve({
              data: {
                count: expedientTypes.length,
                page: 0,
                size: expedientTypes.length,
                data: expedientTypes,
              },
            })
          : resolve({
              data: {
                count: 100,
                page: 1,
                size: 10,
                data: expedientTypes,
              },
            }),
      500
    )
  );
}
