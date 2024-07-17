import { useState } from "react";
import "../App.css";

export default function FlashcardCard({term, definition}) {
  const [isFlipped, setFlipped] = useState(true);

  const handleClick = () => {
    setFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container rounded-lg" onClick={handleClick}>
      <div
        onClick={handleClick}
        className={`border rounded-lg bg-white flashcard text-xl text-center ${
          isFlipped ? "flipped" : ""
        }`}
      >
        <div className="flashcard-front flex items-center justify-center p-4">
          {term}
        </div>
        <div className="flashcard-back flex items-center justify-center p-4">
          {definition}
        </div>
      </div>
    </div>
  );
}
