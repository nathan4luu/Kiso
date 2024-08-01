import { Clock, LeafyGreen, Star, Trash2 } from "lucide-react";
import { getTimeAgo } from "../CurrentUserLibraryTabs/YourDecks";
import FavoriteStar from "../FavoriteStar";
import Tooltip from "../ui/Tooltip";

export default function DeckTitle({
  title,
  editedAt,
  favoritesCount,
  isCurrentUser,
  deckId,
  userId,
}) {
  return (
    <div className="p-2 relative">
      <div className="flex space-x-4 items-center mb-2">
        <h1 className="text-4xl line-clamp-1 py-1 font-bold">{title}</h1>
        {!isCurrentUser && (
          <FavoriteStar
            favorited={favoritesCount > 0}
            deckId={deckId}
            userId={userId}
            size={28}
          />
        )}
      </div>
      <div className="flex space-x-12">
        <div className="flex items-center space-x-2 font-semibold text-gray-500">
          <Clock size={20} color="#6B46C1" />
          <div>Last edited {getTimeAgo(editedAt)}</div>
        </div>
        {favoritesCount > 0 && isCurrentUser && (
          <div className="flex items-center space-x-2 font-semibold text-gray-500">
            <Star size={20} color="#FFD700" fill="#FFD700" />
            <div>
              Favorited by {favoritesCount}{" "}
              {favoritesCount == 1 ? "user" : "users"}
            </div>
          </div>
        )}
      </div>
      {isCurrentUser && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Tooltip text="Delete deck" position="left">
            <button
              className={`flex p-2 justify-end rounded-full items-start text-gray-400 hover:bg-gray-200 hover:text-red-500 transition-all duration-300`}
            >
              <Trash2 width={32} height={32} />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
