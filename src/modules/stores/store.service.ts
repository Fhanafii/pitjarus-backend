import { Store } from "@prisma/client";
import { AppError } from "../../exceptions/AppError";
import {
  CreateStoreDto,
  StoreQuery,
  UpdateStoreDto,
} from "./store.types";
import { StoreRepository } from "./store.repository";
import { buildPaginationResult } from "../../common/pagination/pagination.helper";

export class StoreService {
  private readonly storeRepository: StoreRepository;

  constructor() {
    this.storeRepository = new StoreRepository();
  }

  /**
   * Create Store
   */
  async create(dto: CreateStoreDto): Promise<Store> {
    const existingStore = await this.storeRepository.findByCode(dto.code);

    if (existingStore) {
      throw new AppError("Kode toko sudah digunakan", 409);
    }

    return this.storeRepository.create({
      code: dto.code,
      name: dto.name,
      address: dto.address,
      latitude: dto.latitude,
      longitude: dto.longitude,
    });
  }

  /**
   * Get All Stores
   */
  async findAll(query: StoreQuery) {

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const { stores, total } =
        await this.storeRepository.findAll(
            page,
            limit,
            query.search
        );

    return buildPaginationResult(
        stores,
        page,
        limit,
        total
    );
  }

  /**
   * Get Store Detail
   */
  async findById(id: number): Promise<Store> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError("Store tidak ditemukan", 404);
    }

    return store;
  }

  /**
   * Update Store
   */
  async update(
    id: number,
    dto: UpdateStoreDto
  ): Promise<Store> {

    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError("Store tidak ditemukan", 404);
    }

    const duplicateStore = await this.storeRepository.findByCode(dto.code);

    if (duplicateStore && duplicateStore.id !== id) {
      throw new AppError("Kode toko sudah digunakan", 409);
    }

    return this.storeRepository.update(id, {
      code: dto.code,
      name: dto.name,
      address: dto.address,
      latitude: dto.latitude,
      longitude: dto.longitude,
    });
  }

  /**
   * Delete Store
   */
  async delete(id: number): Promise<void> {

    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError("Store tidak ditemukan", 404);
    }

    await this.storeRepository.delete(id);
  }
}