export interface ProductAvailabilityDto {
  product_id: number;
  available: boolean;
}

export interface CreateProductReportDto {
  client_report_id: string;

  store_id: number;

  timestamp: string;

  products: ProductAvailabilityDto[];
}