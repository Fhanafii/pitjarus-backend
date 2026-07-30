import {
  PaginationMeta,
  PaginationResult,
} from "./pagination.types";

export function buildPaginationResult<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginationResult<T> {

  return {

    data,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },

  };

}