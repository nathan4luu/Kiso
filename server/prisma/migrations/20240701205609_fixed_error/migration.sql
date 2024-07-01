/*
  Warnings:

  - You are about to drop the `FavoriteCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavoriteCard" DROP CONSTRAINT "FavoriteCard_cardId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteCard" DROP CONSTRAINT "FavoriteCard_userId_fkey";

-- DropTable
DROP TABLE "FavoriteCard";

-- CreateTable
CREATE TABLE "FavoriteDeck" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteDeck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavoriteDeck" ADD CONSTRAINT "FavoriteDeck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteDeck" ADD CONSTRAINT "FavoriteDeck_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
