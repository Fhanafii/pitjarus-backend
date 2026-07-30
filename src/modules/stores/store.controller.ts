import { Request, Response } from "express";

import { StoreService } from "./store.service";

import {
  createStoreSchema,
  updateStoreSchema,
  storeIdSchema,
  storeQuerySchema,
  assignProductsSchema
} from "./store.validation";

import { successResponse } from "../../utils/response";

export class StoreController {
  private readonly storeService = new StoreService();

  /**
   * POST /stores
   */
  create = async (req: Request, res: Response) => {

    const dto = createStoreSchema.parse(req.body);

    const store = await this.storeService.create(dto);

    return successResponse(
      res,
      store,
      "Store berhasil dibuat",
      201
    );
  };

  /**
   * POST /stores/:id/products
   */
  assignProducts = async (
    req: Request,
    res: Response
  ) => {

    const { id } =
      storeIdSchema.parse(req.params);

    const dto =
      assignProductsSchema.parse(req.body);

    await this.storeService.assignProducts(
      id,
      dto.product_ids
    );

    return successResponse(
      res,
      null,
      "Produk berhasil ditambahkan ke toko"

    );

  };

  /**
   * DELETE /stores/:storeId/products/:productId
   */
  removeProduct = async (
    req: Request,
    res: Response
  ) => {

    const storeId =
      Number(req.params.storeId);

    const productId =
      Number(req.params.productId);

    await this.storeService.removeProduct(
      storeId,
      productId
    );

    return successResponse(

      res,

      null,

      "Produk berhasil dihapus dari toko"

    );

  };

  /**
   * GET /stores
   */
  findAll = async (req: Request, res: Response) => {

    const query = storeQuerySchema.parse(req.query);

    const result = await this.storeService.findAll(query);

    return successResponse(
      res,
      result.data,
      "Data store berhasil diambil",
      200,
      result.pagination
    );
  };

  /**
   * GET /stores/:id
   */
  findById = async (req: Request, res: Response) => {

    const { id } = storeIdSchema.parse(req.params);

    const store = await this.storeService.findById(id);

    return successResponse(
      res,
      store,
      "Detail store berhasil diambil"
    );
  };

  /**
   * PUT /stores/:id
   */
  update = async (req: Request, res: Response) => {

    const { id } = storeIdSchema.parse(req.params);

    const dto = updateStoreSchema.parse(req.body);

    const store = await this.storeService.update(
      id,
      dto
    );

    return successResponse(
      res,
      store,
      "Store berhasil diperbarui"
    );
  };

  /**
   * DELETE /stores/:id
   */
  delete = async (req: Request, res: Response) => {

    const { id } = storeIdSchema.parse(req.params);

    await this.storeService.delete(id);

    return successResponse(
      res,
      null,
      "Store berhasil dihapus"
    );
  };

  /**
   * GET /stores/:id/products
   */
  getProducts = async (
    req: Request,
    res: Response
  ) => {

      const id =
          Number(req.params.id);

      const products =
          await this.storeService.getProducts(id);

      return successResponse(
          res,
          products,
          "Produk berhasil diambil"
      );
  };
}

export const storeController = new StoreController();