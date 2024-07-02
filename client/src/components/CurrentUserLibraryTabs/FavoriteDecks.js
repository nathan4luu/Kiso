import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ({ currentUserId }) {
  const [favoriteDecks, setFavoriteDecks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteDecks = async () => {
      try {
        const response = await axios.get(
          `/api/users/${currentUserId}/decks/favorites`
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
      <>
        {favoriteDecks.length === 0 ? (
          <p>Favorites? What favorites? You haven't picked any yet!</p>
        ) : (
          <div>
            {favoriteDecks.map((favorite, index) => (
              <div key={index}>{favorite.deck.title}</div>
            ))}
          </div>
        )}
      </>
    );
}
