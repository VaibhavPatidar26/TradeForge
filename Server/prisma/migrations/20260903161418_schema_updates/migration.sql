-- AlterTable
ALTER TABLE `user` ADD COLUMN `refreshToken` TEXT NULL;

-- CreateTable
CREATE TABLE `Stocks` (
    `segment` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `exchange` VARCHAR(191) NOT NULL,
    `isin` VARCHAR(191) NOT NULL,
    `isntrument_type` VARCHAR(191) NOT NULL,
    `instrument_key` VARCHAR(191) NOT NULL,
    `lot_size` DECIMAL(65, 30) NOT NULL,
    `freeze_quantity` DECIMAL(65, 30) NOT NULL,
    `exhange_token` DECIMAL(65, 30) NOT NULL,
    `trading_symbol` VARCHAR(191) NOT NULL,
    `security_type` VARCHAR(191) NOT NULL,

    INDEX `Stocks_name_instrument_key_idx`(`name`, `instrument_key`),
    PRIMARY KEY (`instrument_key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
