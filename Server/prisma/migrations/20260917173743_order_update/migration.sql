/*
  Warnings:

  - Added the required column `orderType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `limitPrice` DECIMAL(65, 30) NULL,
    ADD COLUMN `orderType` ENUM('MARKET', 'LIMIT', 'GTT') NOT NULL,
    MODIFY `status` ENUM('COMPLETED', 'PENDING', 'OPEN', 'REJECTED') NOT NULL,
    MODIFY `executedPrice` DECIMAL(65, 30) NULL,
    MODIFY `total` DECIMAL(65, 30) NULL;

-- AddForeignKey
ALTER TABLE `Holding` ADD CONSTRAINT `Holding_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
