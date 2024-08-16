-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `userID` INTEGER NULL;

-- CreateIndex
CREATE INDEX `id` ON `profiles`(`userID`);
