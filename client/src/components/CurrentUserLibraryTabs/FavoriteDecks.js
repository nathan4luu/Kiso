import axios from "axios";
import { CalendarSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  if (!loading)
    return (
      <div className>
        {favoriteDecks.length === 0 ? (
          <p>Favorites? What favorites? You haven't picked any yet!</p>
        ) : (
          <div>
            {favoriteDecks.map((favorite, index) => (
              <div key={index} >{favorite.deck.title}</div>
            ))}
          </div>
        )}
      </div>
    );
}
