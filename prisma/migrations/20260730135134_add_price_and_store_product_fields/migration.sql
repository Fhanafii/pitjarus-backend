-- AlterTable
ALTER TABLE "products" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "store_products" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "normal_price" INTEGER,
ADD COLUMN     "promo_price" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
