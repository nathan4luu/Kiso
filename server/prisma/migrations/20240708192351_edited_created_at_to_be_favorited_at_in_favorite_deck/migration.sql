/*
  Warnings:

  - You are about to drop the column `createdAt` on the `FavoriteDeck` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FavoriteDeck" DROP COLUMN "createdAt",
ADD COLUMN     "favoritedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
