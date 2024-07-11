import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../api/user";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbCards } from "react-icons/tb";
import { SquarePen, Puzzle, Plus } from "lucide-react";
import "../App.css";
import FlashcardCard from "../components/FlashcardCard";
import FlashcardCarousel from "../components/FlashcardCarousel";
import { getTimeAgo } from "../components/CurrentUserLibraryTabs/YourDecks";
import LoadingSpinner from "../components/LoadingSpinner";

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

  const [largeScreen, setLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const canShowCarousel = window.innerWidth >= 900;
      setLargeScreen(canShowCarousel);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!loading && !error) {
    const isCurrentUser = user.data.id === data.user.id;

    return (
      <div className="py-8 gap-4">
        {/* Title and Days edited*/}
        <div className="p-2">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <h1 className="text-gray-500 italic">
            Last edited {getTimeAgo(data.editedAt)}
          </h1>
        </div>

        {/* creator + description + flashcard carosel + activities */}
        <div className={`${largeScreen && "flex"} pt-4 pb-8 gap-2 border-b-2`}>
          <div className={` flex-grow flex flex-col`}>
            {/* flashcard display */}
            <FlashcardCarousel cards={data.cards} />

            {/* creator and description */}
            <div className={` ${largeScreen && "px-2"}`}>
              <div
                className={`grid mt-2 ${
                  largeScreen ? "grid-flow-col" : "pt-2"
                } gap-4 items-start`}
              >
                {/* Box with "Created by" */}
                <Link
                  to={
                    isCurrentUser
                      ? `/user/${data.user.id}/library/0`
                      : `/user/${data.user.id}/library/`
                  }
                  className={`border rounded-lg bg-white p-4 flex gap-2 items-center font-semibold h-full ${
                    largeScreen ? "col-span-2" : "w-full"
                  }`}
                  style={{ minHeight: "fit-content" }}
                >
                  <img
                    src={data.user.profilePhoto}
                    alt="profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <div className="text-sm font-light">Created by:</div>
                    <div className="hover:text-[#6B46C1] hover:underline">
                      {data.user.name}
                    </div>
                  </div>
                </Link>

                {/* Box with "Description" */}
                {data.description && (
                  <div
                    className={`border rounded-lg bg-white p-2 text-md h-full${
                      largeScreen ? " col-span-3" : "w-full"
                    }`}
                    style={{ minHeight: "fit-content" }}
                  >
                    <div className="font-bold">Description</div>
                    <div className="line-clamp-3 overflow-hidden">
                      {data.description}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* activities display */}
          <div
            className={` ${
              largeScreen
                ? "space-y-4 grid grid-row-3 pr-2"
                : "flex justify-between gap-2 w-full pt-4"
            }`}
          >
            <Link
              to="flashcards"
              className={`bg-white w-full border rounded-lg p-4 md:px-6 flex items-center text-[#6B46C1] transition-colors duration-300 hover:bg-[#ebe6f5] ${
                largeScreen ? "row-span-1" : "flex-1"
              }`}
            >
              <div className="flex gap-2 justify-center">
                <div className="flex justify-end items-center h-12 w-12">
                  <TbCards size={38} />
                </div>
                <div className="hidden min-[700px]:block min-[900px]:w-40 text-left">
                  <div className="text-2xl font-semibold">Flashcards</div>
                  <div className="text-sm font-normal">
                    Master the basics or revisit key concepts
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="matching"
              className={`bg-white w-full border rounded-lg p-4 md:px-6 flex items-center text-emerald-600 transition-colors duration-300 hover:bg-emerald-100 ${
                largeScreen ? "row-span-1" : "flex-1"
              }`}
            >
              <div className="flex gap-2 justify-center">
                <div className="flex justify-end items-center h-12 w-12">
                  <Puzzle size={36} />
                </div>
                <div className="hidden min-[700px]:block min-[900px]:w-40 text-left">
                  <div className="text-2xl font-semibold">Matching</div>
                  <div className="text-sm font-normal">
                    See how fast you can match all the cards
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="practice-quiz"
              className={`bg-white w-full border rounded-lg p-4 md:px-6 flex items-center text-sky-600 transition-colors duration-300 hover:bg-sky-100 ${
                largeScreen ? "row-span-1" : "flex-1"
              }`}
            >
              <div className="flex gap-2 justify-center">
                <div className="flex justify-end items-center h-12 w-12">
                  <SquarePen size={36} />
                </div>
                <div className="hidden min-[700px]:block min-[900px]:w-40 text-left">
                  <div className="text-2xl font-semibold">Practice quiz</div>
                  <div className="text-sm font-normal">
                    Put your knowledge to the test
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* terms and definitions + addNewTerm*/}
        <div className="pt-8">
          <div className="flex px-2 pb-2 text-2xl font-bold">
            {data.cards.length} terms
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
            <div className="pt-6 flex justify-center">
              <div
                id="add-new-card"
                className="w-full border rounded-lg gap-1 shadow text-xl font-normal py-4 transition-all duration-300 ease-in-out transform bg-white text-[#6B46C1] hover:bg-[#ebe6f5] hover:font-bold hover:shadow-lg cursor-pointer flex items-center justify-center"
              >
                <Plus />
                Add New Term
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // or a loading spinner or error message
}
