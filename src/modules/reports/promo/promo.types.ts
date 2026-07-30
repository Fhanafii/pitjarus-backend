export interface PromoItemDto {
  product_name: string;
  normal_price: number;
  promo_price: number;
}

export interface CreatePromoReportDto {
  client_report_id: string;
  store_id: number;
  timestamp: string;
  promo: PromoItemDto[];
}