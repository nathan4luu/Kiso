import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate, formatDistanceToNow } from "date-fns";

export default function YourDecks({ currentUserId }) {
  const [yourDecks, setYourDecks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getTimeAgo = (timestamp) => {
    const formattedTime = formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
    });
    return formattedTime.replace("about", "");
  };

  useEffect(() => {
    const fetchYourDecks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/api/users/${currentUserId}/decks/created`,
          { withCredentials: true }
        );
        setYourDecks(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          setError(error);
          setLoading(false);
          navigate("/");
        }
      }
    };
    fetchYourDecks();
  }, []);
  if (!loading)
    return (
      <div>
        {yourDecks.length === 0 ? (
          <p>Be the hero your study sessions need. Create your first deck!</p>
        ) : (
          <div>
            {yourDecks.map((deck, index) => (
              <div
                key={index}
                className=" rounded-lg border-r-4 border-b-4 border-gray-100 bg-gray-50 transition-colors transition-shadow duration-300 hover:bg-gray-100 hover:border-r-4 hover:border-b-4 hover:border-[#6B46C1] hover:shadow-xl"
              >
                <Link to={`/decks/${deck.id}`} className="block p-4">
                  <div className="gap-2 items-center ">
                    <div className="inline-block items-center rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">
                      {deck.termCount} terms
                    </div>
                    <h1 className="text-2xl font-semibold line-clamp-1 pt-1">
                      {deck.title}
                    </h1>
                    <p className="italic text-s text-slate-500">Edited {getTimeAgo(deck.editedAt)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}