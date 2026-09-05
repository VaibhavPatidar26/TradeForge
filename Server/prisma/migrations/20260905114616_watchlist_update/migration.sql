-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `balance` DECIMAL(65, 30) NOT NULL DEFAULT 100000.00,
    `refreshToken` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stocks` (
    `segment` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `exchange` VARCHAR(191) NOT NULL,
    `instrument_type` VARCHAR(191) NOT NULL,
    `instrument_key` VARCHAR(191) NOT NULL,
    `trading_symbol` VARCHAR(191) NOT NULL,

    INDEX `Stocks_name_instrument_key_idx`(`name`, `instrument_key`),
    PRIMARY KEY (`instrument_key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asset` (
    `id` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('STOCK', 'FOREX') NOT NULL,
    `currentPrice` DECIMAL(65, 30) NOT NULL,
    `exchange` VARCHAR(191) NULL,
    `sector` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Asset_symbol_key`(`symbol`),
    INDEX `Asset_type_idx`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Holding` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `avgPrice` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `userId` VARCHAR(191) NOT NULL,
    `assetId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Holding_userId_assetId_key`(`userId`, `assetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `side` ENUM('BUY', 'SELL') NOT NULL,
    `status` ENUM('COMPLETED', 'REJECTED') NOT NULL,
    `quantity` DECIMAL(65, 30) NOT NULL,
    `executedPrice` DECIMAL(65, 30) NOT NULL,
    `total` DECIMAL(65, 30) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `assetId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Order_userId_createdAt_idx`(`userId`, `createdAt`),
    INDEX `Order_assetId_createdAt_idx`(`assetId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('BUY', 'SELL') NOT NULL,
    `quantity` DECIMAL(65, 30) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `total` DECIMAL(65, 30) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `assetId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Transaction_userId_createdAt_idx`(`userId`, `createdAt`),
    INDEX `Transaction_assetId_createdAt_idx`(`assetId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Watchlist` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `stockId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Watchlist_userId_stockId_key`(`userId`, `stockId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Holding` ADD CONSTRAINT `Holding_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Holding` ADD CONSTRAINT `Holding_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `Stocks`(`instrument_key`) ON DELETE RESTRICT ON UPDATE CASCADE;
