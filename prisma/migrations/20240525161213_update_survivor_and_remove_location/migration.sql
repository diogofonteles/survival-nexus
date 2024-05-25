/*
  Warnings:

  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `latitude` to the `survivors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `survivors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_survivorId_fkey";

-- AlterTable
ALTER TABLE "survivors" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "locations";
