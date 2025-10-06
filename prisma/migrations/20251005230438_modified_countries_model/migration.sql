/*
  Warnings:

  - You are about to drop the column `cod` on the `countries` table. All the data in the column will be lost.
  - Added the required column `continent` to the `Countries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `countries` DROP COLUMN `cod`,
    ADD COLUMN `code` VARCHAR(191) NULL,
    ADD COLUMN `continent` VARCHAR(191) NOT NULL;
