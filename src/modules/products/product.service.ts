import { Product } from "@prisma/client";

import { AppError } from "../../exceptions/AppError";
import { buildPaginationResult } from "../../common/pagination/pagination.helper";

import {
  CreateProductDto,
  ProductQuery,
  UpdateProductDto,
} from "./product.types";

import { ProductRepository } from "./product.repository";

export class ProductService {
  private readonly productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  /**
   * Create Product
   */
  async create(dto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findByBarcode(
      dto.barcode
    );

    if (existingProduct) {
      throw new AppError("Barcode produk sudah digunakan", 409);
    }

    return this.productRepository.create({
      barcode: dto.barcode,
      name: dto.name,
      size: dto.size,
      sku: dto.sku,
    });
  }

  /**
   * Get All Product
   */
  async findAll(query: ProductQuery) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const { products, total } =
      await this.productRepository.findAll(
        page,
        limit,
        query.search
      );

    return buildPaginationResult(
      products,
      page,
      limit,
      total
    );
  }

  /**
   * Detail Product
   */
  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError("Produk tidak ditemukan", 404);
    }

    return product;
  }

  /**
   * Update Product
   */
  async update(
    id: number,
    dto: UpdateProductDto
  ): Promise<Product> {

    const product =
      await this.productRepository.findById(id);

    if (!product) {
      throw new AppError("Produk tidak ditemukan", 404);
    }

    const duplicate =
      await this.productRepository.findByBarcode(
        dto.barcode
      );

    if (duplicate && duplicate.id !== id) {
      throw new AppError(
        "Barcode produk sudah digunakan",
        409
      );
    }

    return this.productRepository.update(id, {
      barcode: dto.barcode,
      name: dto.name,
      size: dto.size,
      sku: dto.sku,
    });
  }

  /**
   * Delete Product
   */
  async delete(id: number): Promise<void> {
    const product =
      await this.productRepository.findById(id);

    if (!product) {
      throw new AppError("Produk tidak ditemukan", 404);
    }

    await this.productRepository.delete(id);
  }
}

export const productService = new ProductService();