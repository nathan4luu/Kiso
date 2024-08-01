-- DropForeignKey
ALTER TABLE "FavoriteDeck" DROP CONSTRAINT "FavoriteDeck_deckId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteDeck" DROP CONSTRAINT "FavoriteDeck_userId_fkey";

-- AddForeignKey
ALTER TABLE "FavoriteDeck" ADD CONSTRAINT "FavoriteDeck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteDeck" ADD CONSTRAINT "FavoriteDeck_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
