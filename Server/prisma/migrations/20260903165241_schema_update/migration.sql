/*
  Warnings:

  - You are about to drop the column `exchange_token` on the `stocks` table. All the data in the column will be lost.
  - You are about to drop the column `freeze_quantity` on the `stocks` table. All the data in the column will be lost.
  - You are about to drop the column `isin` on the `stocks` table. All the data in the column will be lost.
  - You are about to drop the column `lot_size` on the `stocks` table. All the data in the column will be lost.
  - You are about to drop the column `security_type` on the `stocks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `stocks` DROP COLUMN `exchange_token`,
    DROP COLUMN `freeze_quantity`,
    DROP COLUMN `isin`,
    DROP COLUMN `lot_size`,
    DROP COLUMN `security_type`;
