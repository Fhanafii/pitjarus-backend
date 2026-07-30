export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: PaginationMeta;
}