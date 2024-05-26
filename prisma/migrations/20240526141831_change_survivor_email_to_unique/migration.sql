/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `survivors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "survivors_email_key" ON "survivors"("email");
