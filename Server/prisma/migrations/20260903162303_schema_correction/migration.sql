/*
  Warnings:

  - You are about to drop the column `exhange_token` on the `stocks` table. All the data in the column will be lost.
  - You are about to drop the column `isntrument_type` on the `stocks` table. All the data in the column will be lost.
  - Added the required column `exchange_token` to the `Stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instrument_type` to the `Stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stocks` DROP COLUMN `exhange_token`,
    DROP COLUMN `isntrument_type`,
    ADD COLUMN `exchange_token` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `instrument_type` VARCHAR(191) NOT NULL;
