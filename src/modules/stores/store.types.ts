export interface CreateStoreDto {
  code: string;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateStoreDto {
  code: string;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface StoreQuery {
  page?: number;
  limit?: number;
  search?: string;
}