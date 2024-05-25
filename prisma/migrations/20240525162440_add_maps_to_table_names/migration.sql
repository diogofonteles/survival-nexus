/*
  Warnings:

  - You are about to drop the column `createdAt` on the `inventories` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `inventories` table. All the data in the column will be lost.
  - You are about to drop the column `survivorId` on the `inventories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `survivors` table. All the data in the column will be lost.
  - Added the required column `item_id` to the `inventories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `survivor_id` to the `inventories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_itemId_fkey";

-- DropForeignKey
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_survivorId_fkey";

-- AlterTable
ALTER TABLE "inventories" DROP COLUMN "createdAt",
DROP COLUMN "itemId",
DROP COLUMN "survivorId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "item_id" TEXT NOT NULL,
ADD COLUMN     "survivor_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "survivors" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_survivor_id_fkey" FOREIGN KEY ("survivor_id") REFERENCES "survivors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
