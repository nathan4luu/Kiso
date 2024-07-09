import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../api/user";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbCards } from "react-icons/tb";
import { SquarePen, Puzzle } from "lucide-react";
import "../App.css";
import FlashcardCard from "../components/FlashcardCard";
import FlashcardCarousel from "../components/FlashcardCarousel";
import { getTimeAgo } from "../components/CurrentUserLibraryTabs/YourDecks";

export default function DeckDetails() {
  const navigate = useNavigate();
  const user = useUser();
  const { deckId } = useParams();

  useEffect(() => {
    if (user.data === null) {
      navigate("/");
    }
  }, [user, navigate]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/api/decks/${deckId}`,
          { withCredentials: true }
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        navigate("/");
      }
    };

    fetchUserData();
  }, [deckId]);

  const [shouldShowCarousel, setShouldShowCarousel] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check if there's enough space for the carousel
      const canShowCarousel = window.innerWidth >= 900;
      setShouldShowCarousel(canShowCarousel);
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!loading && !error) {
    const isCurrentUser = user.data.id === data.user.id;
    return (
      <div className="py-8 gap-4">
        <div className="p-1">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <h1 className="text-gray-500 italic">
            Edited {getTimeAgo(data.editedAt)}
          </h1>
        </div>

        <div
          className={`${shouldShowCarousel && "flex"} py-6 gap-2 border-b-2`}
        >
          <div
            className={`flex-grow flex flex-col ${
              !shouldShowCarousel && "gap-4 pb-8"
            }`}
          >
            <div className="flex-1">
              <FlashcardCarousel cards={data.cards} />
            </div>

            <div className={`${shouldShowCarousel && "px-2"}`}>
              <div className={` ${shouldShowCarousel ? "flex" : "space-y-2"} gap-4 pt-2`}>
                <Link
                  to={
                    isCurrentUser
                      ? `/user/${data.user.id}/library/0`
                      : `/user/${data.user.id}/library/`
                  }
                  className={`flex min-w-40 border p-2 rounded-lg bg-white items-center gap-2 text-lg font-semibold ${
                    !shouldShowCarousel && "w-full"
                  }`}
                >
                  <img
                    src={data.user.profilePhoto}
                    alt="profile"
                    className="h-8 w-8 rounded-full"
                  ></img>
                  <div className="">
                    <div className="text-sm font-light">Created by:</div>
                    <div className="hover:text-[#6B46C1] hover:underline">
                      {data.user.name}
                    </div>
                  </div>
                </Link>
                  <div className="border rounded-lg bg-white p-2 text-md gap-2 w-full">
                    <div className="font-bold">Description</div>
                    <div className="line-clamp-2 overflow-hidden w-full h-12">
                      {data.description}
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              shouldShowCarousel
                ? "space-y-4"
                : "flex justify-between gap-2 w-full"
            }`}
          >
            <Link
              to="flashcards"
              className={`bg-white w-full border rounded-lg p-4 md:px-8 md:py-16 flex items-center text-[#6B46C1] transition-colors duration-300 hover:bg-[#ebe6f5] ${
                !shouldShowCarousel && "flex-1"
              }`}
            >
              <div className="flex gap-2 justify-center">
                <div className=" flex justify-end items-center h-12 w-12">
                  <TbCards size={38} />
                </div>
                <div className="hidden min-[700px]:block text-left">
                  <div className="text-2xl font-semibold">Flashcards</div>
                  <div className="text-md font-normal">
                    Master the basics or revisit key concepts
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="matching"
              className={`bg-white w-full border rounded-lg p-4 md:px-8 md:py-16 flex items-center text-emerald-600 transition-colors duration-300 hover:bg-emerald-100 ${
                !shouldShowCarousel && "flex-1"
              }`}
            >
              <div className="flex gap-2 justify-center">
                <div className="flex justify-end items-center h-12 w-12">
                  <Puzzle size={36} />
                </div>
                <div className="hidden min-[700px]:block text-left">
                  <div className="text-2xl font-semibold">Matching</div>
                  <div className="text-md font-normal">
                    See how fast you can match all the cards
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="practice-quiz"
              className={`bg-white w-full border rounded-lg p-4 md:px-8 md:py-16 flex items-center text-sky-600 transition-colors duration-300 hover:bg-sky-100 ${
                !shouldShowCarousel && "flex-1"
              }`}
            >
              <div className="flex gap-2 justify-center">
                <div className="flex justify-end items-center h-12 w-12">
                  <SquarePen size={36} />
                </div>
                <div className="hidden min-[700px]:block text-left">
                  <div className="text-2xl font-semibold">Practice quiz</div>
                  <div className="text-md font-normal">
                    Put your knowledge to the test
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="pt-12">
          <div className="flex px-2 pb-2 text-2xl font-bold">
            {data.termCount} terms
          </div>
          <div className="space-y-8">
            {data.cards.map((card) => (
              <div
                key={card.id}
                className="border rounded-lg bg-white shadow shadow-[#ebe6f5] text-xl font-normal p-2"
              >
                <div className="flex py-6">
                  <div className="border-r w-2/5 flex justify-center items-center p-4">
                    {card.term}
                  </div>
                  <div className="border-l w-3/5 flex items-center px-8">
                    {card.definition}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null; // or a loading spinner or error message
}
