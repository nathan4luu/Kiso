import { useState } from "react";
import DeckCard from "../components/DeckCard";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function DeckCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;
  const decks = [
    {
      id: 1,
      title: "First",
      description:
        "This flashcard set covers fundamental concepts and topics in discrete mathematics, essential for computer science and mathematical reasoning.",
      termCount: 10,
      author: "Nathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
    },
    {
      id: 2,
      title: "Second",
      description: "CSO",
      termCount: 24,
      author: "Bob Smith",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
    },
    {
      id: 3,
      title: "Third",
      description: "This is not cheating",
      termCount: 50,
      author: "Jane Doe",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
    },
    {
      id: 4,
      title: "Fourth",
      description:
        "This flashcard set covers fundamental concepts and topics in discrete mathematics, essential for computer science and mathematical reasoning.",
      termCount: 10,
      author: "Nathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
    },
    {
      id: 5,
      title: "Fifth",
      description: "CSO",
      termCount: 24,
      author: "Bob Smith",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
    },
    {
      id: 6,
      title: "Sixth",
      description: "This is not cheating",
      termCount: 50,
      author: "Jane Doe",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
    },
    {
      id: 4,
      title: "Seventh",
      description:
        "This flashcard set covers fundamental concepts and topics in discrete mathematics, essential for computer science and mathematical reasoning.",
      termCount: 10,
      author: "Nathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
    },
    {
      id: 5,
      title: "Eigth",
      description: "CSO",
      termCount: 24,
      author: "Bob Smith",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
    },
    {
      id: 6,
      title: "Ninth",
      description: "This is not cheating",
      termCount: 50,
      author: "Jane Doe",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
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
              author={deck.author}
              profilePhoto={deck.profilePhoto}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-2 gap-2 invisible group-hover:visible">
        <button
          disabled={startIndex <= 0}
          className={`flex items-center justify-center rounded-full w-8 h-8 p-2 bg-gray-100 ${
            startIndex > 0 ? "hover:bg-[#6B46C1] hover:text-white" : "invisible"
          }`}
          onClick={prev}
        >
          <ChevronLeft />
        </button>
        <button
          disabled={startIndex >= decks.length - itemsPerPage}
          className={`flex items-center justify-center rounded-full w-8 h-8 p-2 bg-gray-100 ${
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
