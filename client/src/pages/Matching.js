import { Link, useParams } from "react-router-dom";
import { useDeck } from "../api/deck";
import { ArrowLeft } from "lucide-react";

export default function Matching() {
  const { deckId } = useParams();

  const deck = useDeck(deckId);
  return (
    <div className="flex relative w-full h-full items-center justify-center">
      <Link
        to={`/decks/${deckId}`}
        className="flex items-center p-2 mt-4 space-x-2 absolute left-0 top-0 font-semibold text-xl hover:text-purple-main hover:underline"
      >
        <ArrowLeft />
        <div>Back to {deck.data.title}</div>
      </Link>
      <div>Matching</div>
    </div>
  );
}
