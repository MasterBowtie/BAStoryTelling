/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prompts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchasestory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `titles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `authorID` ON `news`;

-- DropTable
DROP TABLE `comments`;

-- DropTable
DROP TABLE `interests`;

-- DropTable
DROP TABLE `profiles`;

-- DropTable
DROP TABLE `prompts`;

-- DropTable
DROP TABLE `purchasestory`;

-- DropTable
DROP TABLE `roles`;

-- DropTable
DROP TABLE `stories`;

-- DropTable
DROP TABLE `titles`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `userPassword` VARCHAR(255) NOT NULL,
    `roleID` INTEGER NOT NULL DEFAULT 1,
    `passwordSalt` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `userName`(`userName`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(20) NULL,
    `lastName` VARCHAR(20) NULL,
    `avatar` VARCHAR(255) NULL,
    `userID` INTEGER NOT NULL,

    UNIQUE INDEX `Profile_userID_key`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorID` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `promptID` INTEGER NULL,
    `storyID` INTEGER NULL,
    `commentID` INTEGER NULL,
    `newsID` INTEGER NULL,
    `createDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifyDate` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `scifi` BOOLEAN NOT NULL DEFAULT false,
    `fantasy` BOOLEAN NOT NULL DEFAULT false,
    `mystery` BOOLEAN NOT NULL DEFAULT false,
    `dystopian` BOOLEAN NOT NULL DEFAULT false,
    `historical_fiction` BOOLEAN NOT NULL DEFAULT false,
    `satire` BOOLEAN NOT NULL DEFAULT false,
    `non_fiction` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Interest_userID_key`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prompt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorID` INTEGER NOT NULL,
    `createDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifyDate` DATETIME(0) NULL,
    `content` TEXT NOT NULL,
    `publishDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Purchase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `storyID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Story` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `authorID` INTEGER NOT NULL,
    `createDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifyDate` DATETIME(0) NULL,
    `content` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Title` (
    `id` INTEGER NOT NULL,
    `userID` INTEGER NOT NULL,
    `writer` BOOLEAN NOT NULL DEFAULT false,
    `artist` BOOLEAN NOT NULL DEFAULT false,
    `editor` BOOLEAN NOT NULL DEFAULT false,
    `publisher` BOOLEAN NOT NULL DEFAULT false,
    `agent` BOOLEAN NOT NULL DEFAULT false,
    `reader` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Title_userID_key`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleID_fkey` FOREIGN KEY (`roleID`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_authorID_fkey` FOREIGN KEY (`authorID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_promptID_fkey` FOREIGN KEY (`promptID`) REFERENCES `Prompt`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_storyID_fkey` FOREIGN KEY (`storyID`) REFERENCES `Story`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_commentID_fkey` FOREIGN KEY (`commentID`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_newsID_fkey` FOREIGN KEY (`newsID`) REFERENCES `News`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interest` ADD CONSTRAINT `Interest_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_authorID_fkey` FOREIGN KEY (`authorID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prompt` ADD CONSTRAINT `Prompt_authorID_fkey` FOREIGN KEY (`authorID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_storyID_fkey` FOREIGN KEY (`storyID`) REFERENCES `Story`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Story` ADD CONSTRAINT `Story_authorID_fkey` FOREIGN KEY (`authorID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Title` ADD CONSTRAINT `Title_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
