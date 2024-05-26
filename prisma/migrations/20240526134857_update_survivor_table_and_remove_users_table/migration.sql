/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "survivors" ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'test@email.com',
ADD COLUMN     "password" TEXT;

-- DropTable
DROP TABLE "users";
