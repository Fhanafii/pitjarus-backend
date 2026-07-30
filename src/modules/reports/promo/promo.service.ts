import { PromoReport } from "@prisma/client";
import { prisma } from "../../../config/prisma";

import { AppError } from "../../../exceptions/AppError";

import { StoreRepository } from "../../stores/store.repository";
import { ProductRepository } from "../../products/product.repository";
import { StoreProductRepository } from "../../stores/storeProduct.repository";
import { PromoRepository } from "./promo.repository";

import { CreatePromoReportDto } from "./promo.types";

export class PromoService {

  private readonly promoRepository = new PromoRepository();
  private readonly storeRepository = new StoreRepository();
  private readonly productRepository = new ProductRepository();
  private readonly storeProductRepository = new StoreProductRepository();

  async create(
    userId:number,
    dto:CreatePromoReportDto
    ){
        const store =
            await this.storeRepository.findById(
                dto.store_id
            );
        if(!store){
            throw new AppError(
                "Store tidak ditemukan",
                404
            );
        }

        return prisma.$transaction(async(tx)=>{
            //----------------------------------
            // Header
            //----------------------------------

            const report =
                await this.promoRepository.createReport(
                    tx,
                    {

                        clientReportId:
                            dto.client_report_id,

                        user:{
                            connect:{
                                id:userId
                            }
                        },

                        store:{
                            connect:{
                                id:dto.store_id
                            }
                        },

                        reportedAt:
                            new Date(dto.timestamp),

                    }
                );

            //----------------------------------
            // Detail
            //----------------------------------

            for(const item of dto.promo){

                await this.promoRepository.createItem(
                    tx,
                    {

                        reportId:
                            report.id,

                        productName:
                            item.product_name,

                        normalPrice:
                            item.normal_price,

                        promoPrice:
                            item.promo_price,

                    }
                );

                //----------------------------------
                // Update Store Product
                //----------------------------------

                const product =
                    await this.productRepository.findByName(item.product_name);
                
                if(product){
                        await this.storeProductRepository
                            .updatePromotion(
                                dto.store_id,
                                product.id,
                                item.normal_price,
                                item.promo_price
                            );
                }

            }
            return report;
        });
    }
}

export const promoService = new PromoService();