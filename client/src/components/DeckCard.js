import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useState } from "react";
import { useUser } from "../api/user";

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
  const [isHovered, setIsHovered] = useState(false);


  const toggleState = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const isCurrentUser = currentUser === userId;

  return (
    <div className=" h-52 rounded-lg border-b-4 border-gray-100 bg-gray-50 transition-colors transition-shadow duration-300 ease-in-out hover:bg-gray-100 hover:border-b-4 hover:border-[#6B46C1] hover:shadow-xl">
      <Link to={`/decks/${id}`} className="block p-2">
        <div className="flex gap-2 items-center ">
          <h1 className="text-2xl font-semibold py-1 line-clamp-1 hover:text-[#6B46C1]">
            {title}
          </h1>
          {currentUser !== userId && (
            <div onClick={toggleState}>
              <Star
                className="h-6 w-6 "
                fill={`${isActive ? "#FFD700" : "transparent"}`}
                color={`${isActive ? "#FFD700" : "gray"}`}
              />
            </div>
          )}
        </div>
        <div className="inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">
          {termCount} terms
        </div>
        <p className="pt-3 line-clamp-2 h-16">{description}</p>
        <div className="pt-6 flex gap-2 items-center">
          <Link
            to={
              isCurrentUser
                ? `/user/${userId}/library/0`
                : `/user/${userId}/library/`
            }
            className="flex gap-2 hover:underline hover:text-[#6B46C1]"
          >
            <img
              src={profilePhoto}
              alt="Profile"
              className="rounded-full w-6 h-6"
            ></img>
            {user}
          </Link>
        </div>
      </Link>
    </div>
  );
}
