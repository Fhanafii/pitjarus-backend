import { Store } from "@prisma/client";
import { AppError } from "../../exceptions/AppError";
import {
  CreateStoreDto,
  StoreQuery,
  UpdateStoreDto,
} from "./store.types";
import { StoreRepository } from "./store.repository";
import { ProductRepository } from "../products/product.repository";
import { StoreProductRepository } from "./storeProduct.repository";
import { buildPaginationResult } from "../../common/pagination/pagination.helper";

export class StoreService {
  private readonly storeRepository: StoreRepository;
  private readonly productRepository = new ProductRepository();
  private readonly storeProductRepository = new StoreProductRepository();

  constructor() {
    this.storeRepository = new StoreRepository();
    this.productRepository = new ProductRepository();
    this.storeProductRepository = new StoreProductRepository();
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
   * Detail Store
   */
  async findById(id: number) {

    const store =
      await this.storeRepository.findDetail(id);

    if (!store) {
      throw new AppError(
        "Store tidak ditemukan",
        404
      );
    }

    return {

      id: store.id,
      code: store.code,
      name: store.name,
      address: store.address,
      latitude: store.latitude,
      longitude: store.longitude,

      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
      isActive: store.isActive,

      products:

        store.storeProducts.map(item => ({

          id: item.product.id,
          barcode: item.product.barcode,
          name: item.product.name,
          size: item.product.size,
          sku: item.product.sku,
          available: item.available,
          normalPrice: item.normalPrice,
          promoPrice: item.promoPrice,
          
        })),

    };
  }

  /**
   * Assign Product ke Store
   */
  async assignProducts(
    storeId: number,
    productIds: number[]
  ) {

    const store =
      await this.storeRepository.findById(storeId);

    if (!store) {
      throw new AppError(
        "Store tidak ditemukan",
        404
      );
    }

    const products =
      await this.productRepository.findManyByIds(
        productIds
      );

    if (products.length !== productIds.length) {
      throw new AppError(
        "Terdapat product yang tidak ditemukan",
        404
      );
    }

    await this.storeProductRepository.createMany(
      storeId,
      productIds
    );

  }

  /**
   * Remove Product dari Store
   */
  async removeProduct(
    storeId: number,
    productId: number
  ) {

    const result =
      await this.storeProductRepository.delete(
        storeId,
        productId
      );

    if (result.count === 0) {
      throw new AppError(
        "Relasi store dan product tidak ditemukan",
        404
      );
    }

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

  /**
   * GET /stores/:id/products
   */
  async getProducts(storeId: number) {
    const products =
      await this.storeRepository.findByStoreId(storeId);

    if (!products) {
        throw new AppError(
            "Store tidak ditemukan",
            404
        );
    }

    return products.map(item => ({
      id: item.product.id,
      barcode: item.product.barcode,
      name: item.product.name,
      sku: item.product.sku,
      size: item.product.size,
      price: item.product.price,

      available: item.available,
      normalPrice: item.normalPrice,
      promoPrice: item.promoPrice,
  }));
  }
}