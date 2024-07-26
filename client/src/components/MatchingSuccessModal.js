import { Link, useParams } from "react-router-dom";

export default function MatchingSuccessModal({ time, pairCount }) {
  const { deckId } = useParams();
  return (
    <dialog id="MatchingSuccessModal" className="modal">
      <div className="relative modal-box space-y-4">
        <div className="text-emerald-500 text-4xl text-center">Success!</div>
        <div className="text-center text-lg">
          You matched all <b>{pairCount}</b> terms and definitions in{" "}
          <b>{time.toFixed(1)} seconds </b>!
        </div>
        <div className="flex justify-center w-[65%] mx-auto space-x-4">
          <Link
            className="btn border bg-gray-500 hover:bg-gray-600 rounded-lg p-2 text-white focus:outline-none flex-1 text-center"
            to={`/decks/${deckId}`}
          >
            Back to deck page
          </Link>
          <Link
            className="btn border bg-emerald-500 hover:bg-emerald-600 rounded-lg p-2 text-white focus:outline-none flex-1 text-center"
            onClick={() => window.location.reload()}
          >
            Play again
          </Link>
        </div>
      </div>
    </dialog>
  );
}
