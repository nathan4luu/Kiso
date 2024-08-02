import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../api/user";
import { useEffect, useState } from "react";
import "../App.css";
import FlashcardCarousel from "../components/FlashcardCarousel";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import DeckTitle from "../components/DeckDetails/DeckTitle";
import DeckCreatorInfo from "../components/DeckDetails/DeckCreatorInfo";
import DeckDescriptionBox from "../components/DeckDetails/DeckDescriptionBox";
import ActivitiesDisplay from "../components/DeckDetails/ActivitiesDisplay";
import TermsList from "../components/DeckDetails/TermsList";
import NewCards from "../components/DeckDetails/NewCards";
import { useDeck } from "../api/deck";

export default function DeckDetails() {
  const navigate = useNavigate();
  const user = useUser();
  const { deckId } = useParams();
  const deck = useDeck(deckId);

  useEffect(() => {
    if (user.data === null) {
      navigate("/");
    }
    if (deck.isError) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

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

  if (deck.isLoading || user.isLoading) {
    return <LoadingSpinner />;
  }
  if (!deck.isLoading && !deck.error && !user.isLoading && !user.error) {
    const isCurrentUser = user.data.id === deck.data.user.id;

    

    return (
      <div className="py-8 gap-4">
        {/* Title and Days edited*/}
        <DeckTitle
          title={deck.data.title}
          editedAt={deck.data.editedAt}
          favoritesCount={deck.data.favoriteDecks.length}
          isCurrentUser={isCurrentUser}
          deckId={deck.data.id}
          userId = {user.data.id}
        />

        {/* creator + description + flashcard carosel + activities */}
        <div className={`${largeScreen && "flex"} pt-4 pb-8 gap-2 border-b-2`}>
          <div className={` flex-grow flex flex-col`}>
            {/* flashcard display */}
            <FlashcardCarousel cards={deck.data.cards} />

            {/* creator and description */}
            <div className={` ${largeScreen && "px-2"}`}>
              <div
                className={`grid mt-2 ${
                  largeScreen ? "grid-flow-col" : "pt-2"
                } gap-4 items-start`}
              >
                {/* Box with "Created by" */}
                <DeckCreatorInfo
                  user={deck.data.user}
                  isCurrentUser={isCurrentUser}
                  largeScreen={largeScreen}
                />

                {/* Box with "Description" */}
                {(deck.data.description || isCurrentUser) && (
                  <DeckDescriptionBox
                    deckId={deck.data.id}
                    title={deck.data.title}
                    description={deck.data.description}
                    largeScreen={largeScreen}
                    isCurrentUser={isCurrentUser}
                  />
                )}
              </div>
            </div>
          </div>

          {/* activities display */}
          <ActivitiesDisplay largeScreen={largeScreen} />
        </div>

        {/* terms and definitions + addNewTerm*/}
        <div className="pt-8 space-y-8">
          <div className="flex px-2 pb-2 text-2xl font-bold">
            {deck.data.cards.length} terms
          </div>
          <TermsList
            deckId={deck.data.id}
            cards={deck.data.cards}
            isCurrentUser={isCurrentUser}
          />
          {isCurrentUser && <NewCards />}
        </div>
      </div>
    );
  }
}
