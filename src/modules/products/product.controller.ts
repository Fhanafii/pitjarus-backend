import { Request, Response } from "express";

import { successResponse } from "../../utils/response";

import {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
  productQuerySchema,
} from "./product.validation";

import { productService } from "./product.service";

export class ProductController {

  /**
   * POST /products
   */
  create = async (
    req: Request,
    res: Response
  ) => {

    const dto =
      createProductSchema.parse(req.body);

    const product =
      await productService.create(dto);

    return successResponse(
      res,
      product,
      "Produk berhasil dibuat",
      201
    );
  };

  /**
   * GET /products
   */
  findAll = async (
    req: Request,
    res: Response
  ) => {

    const query =
      productQuerySchema.parse(req.query);

    const result =
      await productService.findAll(query);

    return successResponse(
      res,
      result.data,
      "Data produk berhasil diambil",
      200,
      result.pagination
    );
  };

  /**
   * GET /products/:id
   */
  findById = async (
    req: Request,
    res: Response
  ) => {

    const { id } =
      productIdSchema.parse(req.params);

    const product =
      await productService.findById(id);

    return successResponse(
      res,
      product,
      "Detail produk berhasil diambil"
    );
  };

  /**
   * PUT /products/:id
   */
  update = async (
    req: Request,
    res: Response
  ) => {

    const { id } =
      productIdSchema.parse(req.params);

    const dto =
      updateProductSchema.parse(req.body);

    const product =
      await productService.update(id, dto);

    return successResponse(
      res,
      product,
      "Produk berhasil diperbarui"
    );
  };

  /**
   * DELETE /products/:id
   */
  delete = async (
    req: Request,
    res: Response
  ) => {

    const { id } =
      productIdSchema.parse(req.params);

    await productService.delete(id);

    return successResponse(
      res,
      null,
      "Produk berhasil dihapus"
    );
  };
}

export const productController =
  new ProductController();