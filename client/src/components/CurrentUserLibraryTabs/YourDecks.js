import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate, formatDistanceToNow } from "date-fns";
import LoadingSpinner from "../ui/LoadingSpinner";
import { Plus, Trash, Trash2, X } from "lucide-react";
import Tooltip from "../ui/Tooltip";
import DeleteDeckModal from "../DeleteDeckModal";

export const getTimeAgo = (timestamp) => {
  const formattedTime = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  });
  return formattedTime.replace("about", "");
};

export default function YourDecks({ currentUserId }) {
  const [yourDecks, setYourDecks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  if (loading) {
    return <LoadingSpinner />;
  }
  if (!loading)
    return (
      <div>
        {yourDecks.length === 0 ? (
          <div>
            <p>
              Be the hero your study sessions need.{" "}
              <Link
                to={`/user/${currentUserId}/create/deck`}
                className="text-purple-main hover:underline"
              >
                Create your first deck!
              </Link>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <Link
              to={`/user/${currentUserId}/create/deck`}
              className="flex transition-all duration-300 items-center py-4 justify-center text-xl font-normal hover:font-bold rounded-lg bg-white text-[#6B46C1] hover:bg-[#ebe6f5] border-r-4 border-b-4 border-gray-100 bg-white duration-300 hover:bg-gray-100 hover:border-r-4 hover:border-b-4 hover:border-[#6B46C1] hover:shadow-xl hover:shadow-[#ebe6f5]"
            >
              <Plus />
              <div className="line-clamp-1">Create New Deck</div>
            </Link>
            {yourDecks
              .map((deck, index) => (
                <div
                  key={index}
                  className="relative rounded-lg border-r-4 border-b-4 border-gray-100 bg-white transition-all duration-300 duration-300 hover:bg-gray-100 hover:border-r-4 hover:border-b-4 hover:border-[#6B46C1] hover:shadow-xl hover:shadow-[#ebe6f5]"
                >
                  <Link to={`/decks/${deck.id}`} className="block p-4">
                    <div className="gap-2 items-center ">
                      <div className="inline-block items-center rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">
                        {deck.cards.length} terms
                      </div>
                      <div className="text-2xl font-semibold line-clamp-1 pt-1">
                        {deck.title}
                      </div>
                      <div className="italic text-s text-slate-500">
                        Last edited {getTimeAgo(deck.editedAt)}
                      </div>
                    </div>
                  </Link>
                  <div className="absolute top-1 right-1">
                    <Tooltip text="Delete deck" position="left">
                      <button
                        className={`flex p-2 justify-end rounded-full items-start text-gray-400 hover:text-black hover:bg-gray-200 hover:text-red-500 transition-all duration-300`}
                        onClick={() =>
                          document
                            .getElementById(`deleteDeckModal${deck.id}`)
                            .showModal()
                        }
                      >
                        <Trash2 width={18} height={18} />
                      </button>
                    </Tooltip>
                  </div>
                  <DeleteDeckModal deckId={deck.id} />
                </div>
              ))
              .reverse()}
          </div>
        )}
      </div>
    );
}
