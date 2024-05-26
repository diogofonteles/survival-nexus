/*
  Warnings:

  - Made the column `password` on table `survivors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "survivors" ALTER COLUMN "password" SET NOT NULL;
