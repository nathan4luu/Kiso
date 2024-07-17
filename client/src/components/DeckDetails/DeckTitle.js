import { Clock, LeafyGreen, Star } from "lucide-react";
import { getTimeAgo } from "../CurrentUserLibraryTabs/YourDecks";

export default function DeckTitle({ title, editedAt, favoritesCount, isCurrentUser }) {
  return (
    <div className="p-2">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="flex space-x-12">
        <div className="flex items-center space-x-2 font-semibold text-gray-500">
          <Clock size={20} color="#6B46C1" />
          <div>Last edited {getTimeAgo(editedAt)}</div>
        </div>
        {favoritesCount > 0 && isCurrentUser &&
        <div className="flex items-center space-x-2 font-semibold text-gray-500">
          <Star size={20} color="#FFD700" fill="#FFD700" />
          <div>Favorited by {favoritesCount} users</div>
        </div>
}
      </div>
    </div>
  );
}
