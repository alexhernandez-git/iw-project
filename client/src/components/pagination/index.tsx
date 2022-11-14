import React from "react";

type Props = {
  onNextPage: () => void;
  onPreviousPage: () => void;
  limit: number;
  count: number;
  page: number;
};

const Pagination = ({
  limit,
  count,
  page,
  onNextPage,
  onPreviousPage,
}: Props) => {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Page <span className="font-medium">{page}</span> Total{" "}
          <span className="font-medium">{count}</span>
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        {page > 1 && (
          <button
            onClick={onPreviousPage}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
        )}
        {page * limit < count && (
          <button
            onClick={onNextPage}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
