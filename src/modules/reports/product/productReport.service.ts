import { prisma } from "../../../config/prisma";

import { AppError } from "../../../exceptions/AppError";

import { ProductReportRepository } from "./productReport.repository";

import { StoreRepository } from "../../stores/store.repository";
import { ProductRepository } from "../../products/product.repository";

import { CreateProductReportDto } from "./productReport.types";

export class ProductReportService {

  private readonly productReportRepository =
    new ProductReportRepository();

  private readonly storeRepository =
    new StoreRepository();

  private readonly productRepository =
    new ProductRepository();

  /**
   * Create Product Report
   */
  async create(
    userId: number,
    dto: CreateProductReportDto
  ) {

    /**
     * Duplicate client_report_id
     */
    const existingReport =
      await this.productReportRepository.findByClientReportId(
        dto.client_report_id
      );

    if (existingReport) {

      throw new AppError(
        "Report sudah pernah dikirim",
        409
      );

    }

    /**
     * Validate Store
     */
    const store =
      await this.storeRepository.findById(
        dto.store_id
      );

    if (!store) {

      throw new AppError(
        "Store tidak ditemukan",
        404
      );

    }

    /**
     * Validate Product
     */
    const productIds =
      dto.products.map(
        product => product.product_id
      );

    const products =
      await Promise.all(

        productIds.map(id =>
          this.productRepository.findById(id)
        )

      );

    const invalidProduct =
      products.find(product => !product);

    if (invalidProduct !== undefined) {

      throw new AppError(
        "Terdapat product yang tidak ditemukan",
        404
      );

    }

    /**
     * Transaction
     */
    return prisma.$transaction(async (tx) => {

      /**
       * Header
       */
      const report =
        await this.productReportRepository.createReport(
          tx,
          {

            clientReportId:
              dto.client_report_id,

            reportedAt:
              new Date(dto.timestamp),

            user: {
              connect: {
                id: userId,
              },
            },

            store: {
              connect: {
                id: dto.store_id,
              },
            },

          }
        );

      /**
       * Detail
       */
      await this.productReportRepository.createItems(
        tx,

        dto.products.map(product => ({
          reportId: report.id,
          productId: product.product_id,
          available: product.available,

        }))

      );

      return report;

    });

  }

}

export const productReportService =
  new ProductReportService();