import { Link, redirect } from "react-router-dom";
import { Star } from "lucide-react";
import { useState } from "react";
import { useUser } from "../api/user";
import FavoriteStar from "./FavoriteStar";

export default function DeckCard({
  id,
  title,
  description,
  termCount,
  user,
  userId,
  profilePhoto,
  favorited,
  currentUser,
}) {
  const [isActive, setIsActive] = useState(favorited || false);

  const toggleState = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const isCurrentUser = currentUser === userId;

  return (
    <div className="rounded-lg border-b-4 border-gray-100 bg-white transition-all duration-300 ease-in-out hover:bg-gray-100 hover:border-b-4 hover:border-[#6B46C1] hover:shadow-xl hover:shadow-[#ebe6f5]">
      <Link to={`/decks/${id}`} className="block p-2 space-y-1 group">
        <div className="flex gap-2 items-center pt-1">
          <h1 className="text-2xl mb-1 font-semibold line-clamp-1 lg:line-clamp-2 h-16 md:h-auto flex-grow hover:text-[#6B46C1]">
            {title}
          </h1>
          {currentUser !== userId && (
            <FavoriteStar favorited={favorited} deckId={id} userId={userId}/>
          )}
        </div>
        <div className="inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold ">
          {termCount} terms
        </div>
        {description ? (
          <p className="pt-3 line-clamp-3 md:line-clamp-2 h-16">
            {description}
          </p>
        ) : (
          <p className="pt-3 italic md:line-clamp-2 h-16">
            No description available.
          </p>
        )}
      </Link>

      <div className="pt-6 flex gap-2 items-center">
        <Link
          to={
            isCurrentUser
              ? `/user/${userId}/library/0`
              : `/user/${userId}/library/`
          }
          className="flex gap-2 p-2 hover:underline hover:text-[#6B46C1]"
        >
          <img
            src={profilePhoto}
            alt="Profile"
            className="rounded-full w-6 h-6"
          ></img>
          {user}
        </Link>
      </div>
    </div>
  );
}
