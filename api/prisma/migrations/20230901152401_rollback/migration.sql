/*
  Warnings:

  - You are about to drop the column `userid` on the `OAuth2Token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `OAuth2Token` DROP FOREIGN KEY `OAuth2Token_userid_fkey`;

-- AlterTable
ALTER TABLE `OAuth2Token` DROP COLUMN `userid`;
