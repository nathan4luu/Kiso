import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeck, useShuffledCards } from "../api/deck";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../api/user";
import MatchingSuccessModal from "../components/MatchingSuccessModal";
import GameClock from "../components/GameClock";
import { GiWhistle } from "react-icons/gi";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

export default function Matching() {
  const { deckId } = useParams();

  const deck = useDeck(deckId);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(new Set([]));
  const [feedback, setFeedback] = useState(null); // { id: 1, type: 'success' | 'error' }
  const [progressWidth, setProgressWidth] = useState("0%");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [lastClickTime, setLastClickTime] = useState(time);

  const user = useUser();
  const navigate = useNavigate();

  const shuffledCards = useShuffledCards(deckId, 10);

  const transitionTime = 400;

  const [isGameComplete, setIsGameComplete] = useState(false);

  const matchingRef = useRef(null);

  useEffect(() => {
    if (user.data === null) {
      navigate("/");
    }
    if (deck.data === null || deck.isError) {
      navigate("/dashboard");
    }
    if (shuffledCards.data === null || shuffledCards.isError) {
      navigate("/dashboard");
    }
  }, [user, deck, navigate, shuffledCards]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && matchingRef.current) {
        matchingRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (matchedPairs.size === shuffledCards.data?.length / 2) {
      setIsGameComplete(true);
      document.getElementById("MatchingSuccessModal").showModal();
    }
    if (time - lastClickTime >= 60) {
      setIsGameComplete(true);
      document.getElementById("TimeOutModal").showModal();
    }
  }, [matchedPairs, time, lastClickTime]);

  useEffect(() => {
    if (shuffledCards.data) {
      const totalPairs = shuffledCards.data.length / 2;
      const progressPercentage = (matchedPairs.size / totalPairs) * 100;
      setProgressWidth(`${progressPercentage}%`);

      if (selectedCards.length === 2) {
        const [card1, card2] = selectedCards;
        if (card1.id === card2.id && card1.type !== card2.type) {
          setFeedback({ type: "success", cards: [card1, card2] });
        } else {
          setFeedback({ type: "error", cards: [card1, card2] });
          setTimeout(() => {
            setFeedback(null);
            setSelectedCards([]);
          }, transitionTime);
        }
      }
    }
  }, [selectedCards, matchedPairs]);

  const handleClick = (card) => {
    if (
      selectedCards.some(
        (selected) => selected.id === card.id && selected.type === card.type
      )
    ) {
      setSelectedCards((prev) =>
        prev.filter(
          (selected) =>
            !(selected.id === card.id && selected.type === card.type)
        )
      );
    } else if (selectedCards.length < 2) {
      setSelectedCards((prev) => [...prev, card]);
    }
  };

  const getCardClassName = (card) => {
    if (
      feedback &&
      feedback.cards &&
      feedback.cards.some(
        (selected) => selected.id === card.id && selected.type === card.type
      )
    ) {
      if (feedback.type === "success") {
        setTimeout(() => {
          setMatchedPairs((prev) => new Set([...prev, card.id]));
          setFeedback(null);
          setSelectedCards([]);
        }, transitionTime);
        return "bg-emerald-200 font-medium";
      }
      if (feedback.type === "error") return "bg-red-200 font-medium";
    }
    if (matchedPairs.has(card.id)) {
      return "text-gray-300";
    }
    if (
      selectedCards.some(
        (selected) => selected.id === card.id && selected.type === card.type
      )
    )
      return "bg-gray-200 font-medium";

    return "";
  };
  if (shuffledCards.isLoading || shuffledCards.isFetching || deck.isLoading) {
    return <LoadingSpinner />;
  }
  if (
    !deck.isLoading &&
    !deck.error &&
    !shuffledCards.isLoading &&
    !shuffledCards.error
  )
    return (
      <div className="flex relative w-full h-full items-center justify-center">
        <Link
          to={`/decks/${deckId}`}
          className="flex items-center p-2 mt-4 space-x-2 absolute left-0 top-0 font-semibold text-xl hover:text-purple-main hover:underline"
        >
          <ArrowLeft />
          <div className="line-clamp-1">Back to {deck.data.title}</div>
        </Link>
        <div
          className="border-2 rounded-lg w-full mt-20 mb-8 "
          ref={matchingRef}
        >
          <div className="flex items-center space-x-2 w-full p-4">
            <div className="w-full bg-gray-200 rounded-full h-5 dark:bg-gray-700">
              <div
                className={`${
                  matchedPairs.size === shuffledCards.data.length / 2
                    ? "bg-emerald-400"
                    : "bg-purple-main"
                } transition-all duration-200 h-5 rounded-full relative`}
                style={{ width: progressWidth }}
              >
                {progressWidth !== "0%" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs tracking-wide font-semibold invisible lg:visible">
                      {matchedPairs.size} / {shuffledCards.data.length / 2}{" "}
                      matches
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-[5%] flex justify-center">
              <GameClock
                time={time}
                setTime={setTime}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                isGameComplete={isGameComplete}
              />
            </div>
          </div>

          <div className="p-4 grid grid-flow-row grid-cols-2 md:grid-cols-4 gap-4">
            {shuffledCards.data.map((term, index) => (
              <div
                key={index}
                disabled={matchedPairs.has(term.id)}
                className={`transition-colors duration-200 border rounded-lg flex items-stretch justify-center ${getCardClassName(
                  term
                )}`}
                onClick={() => {
                  if (!matchedPairs.has(term.id)) {
                    setLastClickTime(time);
                    handleClick(term);
                  }
                }}
              >
                <div className="flex items-center justify-center p-2 w-full">
                  <p className="text-center text-md line-clamp-6 select-none">
                    {term.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <MatchingSuccessModal time={time} pairCount={matchedPairs.size} />

        <dialog id="TimeOutModal" className="modal">
          <div className="relative modal-box space-y-2 text-center">
            <div className="flex justify-center items-center">
              <GiWhistle size={30} />
            </div>
            <div className="text-2xl space-x-2">
              Stumped? We'll call a time out
            </div>
            <div className="">
              Just click resume whenever you're ready to jump back in
            </div>
            <div className="flex justify-center">
              <button
                className="btn border rounded-lg bg-purple-main text-white p-2 focus:outline-none"
                onClick={() => {
                  setLastClickTime(time);
                  setIsGameComplete(false);
                  setIsRunning(true);
                  document.getElementById("TimeOutModal").close();
                }}
              >
                Resume
              </button>
            </div>
          </div>
        </dialog>
      </div>
    );
}
