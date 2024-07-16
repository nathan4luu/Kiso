import { useParams } from "react-router-dom";
import FlashcardCarousel from "../components/FlashcardCarousel";
import { useDeck } from "../api/deck";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function Flashcards() {
  const { deckId } = useParams();

  const deck = useDeck(deckId);

  if (deck.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex justify-center w-full">
        <FlashcardCarousel cards={deck.data.cards} />
      </div>
    </div>
  );
}
