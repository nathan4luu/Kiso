import axios from "axios";
import { CalendarSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTimeAgo } from "./YourDecks";
import LoadingSpinner from "../LoadingSpinner";

export default function FavoriteDecks({ currentUserId }) {
  const [favoriteDecks, setFavoriteDecks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteDecks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/api/users/${currentUserId}/decks/favorites`,
          { withCredentials: true }
        );
        setFavoriteDecks(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          setError(error);
          setLoading(false);
          navigate("/");
        }
      }
    };
    fetchFavoriteDecks();
  }, []);
  if (loading) {
    return <LoadingSpinner />;
  }
  if (!loading)
    return (
      <div>
        {favoriteDecks.length === 0 ? (
          <p>Favorites? What favorites? You haven't picked any yet!</p>
        ) : (
          <div>
            {favoriteDecks.map((favorite, index) => (
              <div
                key={index}
                className=" rounded-lg border-r-4 border-b-4 border-gray-100 bg-white transition-colors transition-shadow duration-300 hover:bg-gray-100 hover:border-r-4 hover:border-b-4 hover:border-[#6B46C1] hover:shadow-xl hover:shadow-[#ebe6f5]"
              >
                <Link to={`/decks/${favorite.deck.id}`} className="block p-4">
                  <div className="gap-2 items-center ">
                    <div className="inline-block items-center rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">
                      {favorite.deck.cards.length} terms
                    </div>
                    <div className="text-2xl font-semibold line-clamp-1 pt-1">
                      {favorite.deck.title}
                    </div>
                    <div className="italic text-s text-slate-500">
                      Favorited {getTimeAgo(favorite.favoritedAt)}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}
