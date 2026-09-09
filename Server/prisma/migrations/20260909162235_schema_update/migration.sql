/*
  Warnings:

  - You are about to drop the column `assetId` on the `holding` table. All the data in the column will be lost.
  - You are about to drop the column `assetId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `assetId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the `asset` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,stockId]` on the table `Holding` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stockId` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `holding` DROP FOREIGN KEY `Holding_assetId_fkey`;

-- DropForeignKey
ALTER TABLE `holding` DROP FOREIGN KEY `Holding_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_assetId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_assetId_fkey`;

-- DropIndex
DROP INDEX `Holding_assetId_fkey` ON `holding`;

-- DropIndex
DROP INDEX `Holding_userId_assetId_key` ON `holding`;

-- DropIndex
DROP INDEX `Order_assetId_createdAt_idx` ON `order`;

-- DropIndex
DROP INDEX `Transaction_assetId_createdAt_idx` ON `transaction`;

-- AlterTable
ALTER TABLE `holding` DROP COLUMN `assetId`,
    ADD COLUMN `stockId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `assetId`,
    ADD COLUMN `stockId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `assetId`,
    ADD COLUMN `stockId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `asset`;

-- CreateIndex
CREATE UNIQUE INDEX `Holding_userId_stockId_key` ON `Holding`(`userId`, `stockId`);

-- CreateIndex
CREATE INDEX `Order_stockId_createdAt_idx` ON `Order`(`stockId`, `createdAt`);

-- CreateIndex
CREATE INDEX `Transaction_stockId_createdAt_idx` ON `Transaction`(`stockId`, `createdAt`);

-- AddForeignKey
ALTER TABLE `Holding` ADD CONSTRAINT `Holding_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `Stocks`(`instrument_key`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `Stocks`(`instrument_key`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `Stocks`(`instrument_key`) ON DELETE RESTRICT ON UPDATE CASCADE;
