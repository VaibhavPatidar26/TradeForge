/*
  Warnings:

  - You are about to drop the column `filledQty` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `order` table. All the data in the column will be lost.
  - The values [PENDING,PARTIALLY_FILLED,FILLED,CANCELLED] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `lockedBalance` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `trade` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `executedPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `orderId` on table `transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_assetId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `trade` DROP FOREIGN KEY `Trade_assetId_fkey`;

-- DropForeignKey
ALTER TABLE `trade` DROP FOREIGN KEY `Trade_buyOrderId_fkey`;

-- DropForeignKey
ALTER TABLE `trade` DROP FOREIGN KEY `Trade_buyerId_fkey`;

-- DropForeignKey
ALTER TABLE `trade` DROP FOREIGN KEY `Trade_sellOrderId_fkey`;

-- DropForeignKey
ALTER TABLE `trade` DROP FOREIGN KEY `Trade_sellerId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_orderId_fkey`;

-- DropIndex
DROP INDEX `Order_assetId_status_idx` ON `order`;

-- DropIndex
DROP INDEX `Order_userId_status_idx` ON `order`;

-- DropIndex
DROP INDEX `Transaction_orderId_fkey` ON `transaction`;

-- AlterTable
ALTER TABLE `holding` MODIFY `quantity` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    MODIFY `avgPrice` DECIMAL(65, 30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `filledQty`,
    DROP COLUMN `price`,
    DROP COLUMN `type`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `executedPrice` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `total` DECIMAL(65, 30) NOT NULL,
    MODIFY `status` ENUM('COMPLETED', 'REJECTED') NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `orderId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `lockedBalance`;

-- DropTable
DROP TABLE `trade`;

-- CreateIndex
CREATE INDEX `Asset_type_idx` ON `Asset`(`type`);

-- CreateIndex
CREATE INDEX `Order_userId_createdAt_idx` ON `Order`(`userId`, `createdAt`);

-- CreateIndex
CREATE INDEX `Order_assetId_createdAt_idx` ON `Order`(`assetId`, `createdAt`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
