import { PaginationQuery } from "../../common/pagination/pagination.types";

export interface CreateProductDto {
  barcode: string;
  name: string;
  size: string;
  sku: string;
}

export interface UpdateProductDto {
  barcode: string;
  name: string;
  size: string;
  sku: string;
}

export interface ProductQuery extends PaginationQuery {}