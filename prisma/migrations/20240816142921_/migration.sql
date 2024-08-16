-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `userPassword` VARCHAR(255) NOT NULL,
    `roleID` INTEGER NOT NULL DEFAULT 1,
    `passwordSalt` VARCHAR(255) NOT NULL,
    `profileID` INTEGER NOT NULL,

    UNIQUE INDEX `userName`(`userName`),
    UNIQUE INDEX `email`(`email`),
    INDEX `roleID`(`roleID`),
    INDEX `profileID`(`profileID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profiles` (
    `profileID` INTEGER NOT NULL,
    `firstName` VARCHAR(20) NULL,
    `lastName` VARCHAR(20) NULL,
    `avatar` VARCHAR(255) NULL,

    PRIMARY KEY (`profileID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorID` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `promptID` INTEGER NULL,
    `storyID` INTEGER NULL,
    `commentID` INTEGER NULL,
    `newsID` INTEGER NULL,
    `createDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifyDate` DATETIME(0) NULL,

    INDEX `authorID`(`authorID`),
    INDEX `commentID`(`commentID`),
    INDEX `newsID`(`newsID`),
    INDEX `promptID`(`promptID`),
    INDEX `storyID`(`storyID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interests` (
    `interestID` INTEGER NOT NULL,
    `scifi` BOOLEAN NOT NULL DEFAULT false,
    `fantasy` BOOLEAN NOT NULL DEFAULT false,
    `mystery` BOOLEAN NOT NULL DEFAULT false,
    `dystopian` BOOLEAN NOT NULL DEFAULT false,
    `historical_fiction` BOOLEAN NOT NULL DEFAULT false,
    `satire` BOOLEAN NOT NULL DEFAULT false,
    `non_fiction` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`interestID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `authorID` INTEGER NOT NULL,
    `createDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifyDate` DATETIME(0) NULL,
    `content` TEXT NOT NULL,

    INDEX `authorID`(`authorID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prompts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorID` INTEGER NOT NULL,
    `createDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifyDate` DATETIME(0) NULL,
    `content` TEXT NOT NULL,
    `publishDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `authorID`(`authorID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchasestory` (
    `userID` INTEGER NOT NULL,
    `storyID` INTEGER NOT NULL,

    INDEX `storyID`(`storyID`),
    PRIMARY KEY (`userID`, `storyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `authorID` INTEGER NOT NULL,
    `createDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifyDate` DATETIME(0) NULL,
    `content` TEXT NOT NULL,

    INDEX `authorID`(`authorID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `titles` (
    `titleID` INTEGER NOT NULL,
    `writer` BOOLEAN NOT NULL DEFAULT false,
    `artist` BOOLEAN NOT NULL DEFAULT false,
    `editor` BOOLEAN NOT NULL DEFAULT false,
    `publisher` BOOLEAN NOT NULL DEFAULT false,
    `agent` BOOLEAN NOT NULL DEFAULT false,
    `reader` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`titleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
