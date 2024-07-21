import { Link, useParams } from "react-router-dom";
import FlashcardCarousel from "../components/FlashcardCarousel";
import { useDeck } from "../api/deck";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { ArrowLeft } from "lucide-react";

export default function Flashcards() {
  const { deckId } = useParams();

  const deck = useDeck(deckId);

  if (deck.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex relative w-full h-full items-center justify-center">
      <div className="flex justify-center w-full">
        <FlashcardCarousel cards={deck.data.cards} />
      </div>
      <Link
        to={`/decks/${deckId}`}
        className="flex items-center p-2 mt-4 space-x-2 absolute left-0 top-0 font-semibold text-xl hover:text-purple-main hover:underline"
      >
        <ArrowLeft />
        <div>Back to {deck.data.title}</div>
      </Link>
    </div>
  );
}
