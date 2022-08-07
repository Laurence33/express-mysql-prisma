/*
  Warnings:

  - A unique constraint covering the columns `[loginId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `loginId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `loginId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Login` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_loginId_key` ON `User`(`loginId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_loginId_fkey` FOREIGN KEY (`loginId`) REFERENCES `Login`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
