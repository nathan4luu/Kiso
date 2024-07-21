import { Star } from "lucide-react";
import { useState } from "react";

export default function FavoriteStar({ favorited, deckId, userId, size = 24 }) {
  const [isActive, setIsActive] = useState(favorited);

  const toggleState = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };
  return (
    <div onClick={toggleState}>
      <Star
        className="transition-colors duration-300 ease-in-out"
        size={size}
        fill={`${isActive ? "#FFD700" : "transparent"}`}
        color={`${isActive ? "#FFD700" : "gray"}`}
      />
    </div>
  );
}
