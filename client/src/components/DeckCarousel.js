import { useEffect, useState } from "react";
import DeckCard from "../components/DeckCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useUser } from "../api/user";

export default function DeckCarousel({currentUser}) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4040/api/decks/clxz5b8ve0000tc8i7ue3nv3d", {withCredentials: true,}
        ); 
        setData(response.data); 
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (!loading) {
    const decks = [
      {
        id: data.id,
        title: data.title,
        description: data.description,
        termCount: data.termCount,
        user: data.user.name,
        userId: data.user.id,
        profilePhoto: data.user.profilePhoto,
        favorited: data.FavoriteDeck.length > 0,
      },
      {
        id: 2,
        title: "Second",
        description: "Time to study",
        termCount: 24,
        user: "Bob Smith",
        userId: 2,
        profilePhoto:
          "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
        favorited: false,
      },
      {
        id: 3,
        title: "Third",
        description: "This is not cheating",
        termCount: 50,
        user: "Jane Doe",
        userId: 2,
        profilePhoto:
          "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
        favorited: true,
      },
      {
        id: 4,
        title: "Fourth",
        description:
          "This flashcard set covers fundamental concepts and topics in discrete mathematics, essential for computer science and mathematical reasoning.",
        termCount: 10,
        user: "Nathan Luu",
        userId: 2,
        profilePhoto:
          "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
        favorited: false,
      },
      {
        id: 5,
        title: "Fifth",
        description: "Study guide",
        termCount: 24,
        user: "Bob Smith",
        userId: 2,
        profilePhoto:
          "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
        favorited: true,
      },
      {
        id: 6,
        title: "Sixth",
        description: "This is not cheating",
        termCount: 50,
        user: "Jane Doe",
        userId: 2,
        profilePhoto:
          "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
        favorited: false,
      },
      {
        id: 4,
        title: "Seventh",
        description:
          "This flashcard set covers fundamental concepts and topics in discrete mathematics, essential for computer science and mathematical reasoning.",
        termCount: 10,
        user: "Nathan Luu",
        userId: 2,
        profilePhoto:
          "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
        favorited: false,
      },
      {
        id: 5,
        title: "Eigth",
        description: "Advanced placement",
        termCount: 24,
        user: "Bob Smith",
        userId: 2,
        profilePhoto:
          "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
        favorited: false,
      },
      {
        id: 6,
        title: "Ninth",
        description: "This is not cheating",
        termCount: 50,
        user: "Jane Doe",
        userId: 2,
        profilePhoto:
          "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
        favorited: false,
      },
    ];

    const next = () => {
      const newIndex = Math.min(
        startIndex + itemsPerPage,
        decks.length - itemsPerPage
      );
      setStartIndex(newIndex);
    };

    const prev = () => {
      const newIndex = Math.max(startIndex - itemsPerPage, 0);
      setStartIndex(newIndex);
    };
    return (
      <div className="relative w-full overflow-hidden group">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {decks.map((deck, index) => (
            <div key={index} className={`relative w-1/3 px-2 flex-none`}>
              <DeckCard
                key={index}
                id={deck.id}
                title={deck.title}
                description={deck.description}
                termCount={deck.termCount}
                user={deck.user}
                userId={deck.userId}
                profilePhoto={deck.profilePhoto}
                favorited={deck.favorited}
                currentUser = {currentUser}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-2 gap-2 invisible group-hover:visible">
          <button
            disabled={startIndex <= 0}
            className={`flex items-center justify-center rounded-full w-10 h-10 p-1 bg-gray-100 dark:border-[#6B46C1] dark:border-2 dark:text-[#6B46C1] ${
              startIndex > 0
                ? "hover:bg-[#6B46C1] hover:text-white"
                : "invisible"
            }`}
            onClick={prev}
          >
            <ChevronLeft />
          </button>
          <button
            disabled={startIndex >= decks.length - itemsPerPage}
            className={`flex items-center justify-center rounded-full w-10 h-10 p-1 bg-gray-100 dark:border-[#6B46C1] dark:border-2 dark:text-[#6B46C1] ${
              startIndex < decks.length - itemsPerPage
                ? "hover:bg-[#6B46C1] hover:text-white"
                : "invisible"
            }`}
            onClick={next}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    );
  }
}
