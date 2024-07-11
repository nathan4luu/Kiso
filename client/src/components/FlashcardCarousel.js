import { useState } from "react";
import FlashcardCard from "./FlashcardCard";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function FlashcardCarousel({ cards }) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 1;

  const next = () => {
    const newIndex = Math.min(
      startIndex + itemsPerPage,
      cards.length - itemsPerPage
    );
    setStartIndex(newIndex);
  };

  const prev = () => {
    const newIndex = Math.max(startIndex - itemsPerPage, 0);
    setStartIndex(newIndex);
  };

  return (
    <div className="h-auto space-y-2 flex-grow w-full h-full overflow-hidden group">
      <div
        className="flex h-128 flex-shrink-0 transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${startIndex * 100}%)`,
        }}
      >
        {cards.map((card, index) => (
          <div key={index} className="px-2 relative w-full flex-none">
            <FlashcardCard term={card.term} definition={card.definition} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="flex items-start">
          <div className="flex items-center bg-white rounded-full border gap-4 p-1">
            <button
              disabled={startIndex <= 0}
              className={`flex items-center justify-center rounded-full w-10 h-10 bg-white dark:border-[#6B46C1] dark:border-2 dark:text-[#6B46C1] ${
                startIndex > 0 && "hover:bg-[#6B46C1] hover:text-white"
              }`}
              onClick={prev}
            >
              <ChevronLeft />
            </button>
            <p className="flex justify-center text-black min-w-8">
              {startIndex + 1} / {cards.length}
            </p>
            <button
              disabled={startIndex >= cards.length - itemsPerPage}
              className={`flex items-center justify-center rounded-full w-10 h-10 bg-white dark:border-[#6B46C1] dark:border-2 dark:text-[#6B46C1] ${
                startIndex < cards.length - itemsPerPage &&
                "hover:bg-[#6B46C1] hover:text-white"
              }`}
              onClick={next}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
