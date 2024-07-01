import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../api/user";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeckDetails() {
  const navigate = useNavigate();
  const user = useUser();
  const { deckId } = useParams();
  useEffect(() => {
    if (user.data === null) {
      navigate("/");
    }
  }, [user, navigate]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4040/api/decks/" + deckId
        ); 
        setData(response.data); 
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        navigate("/");
      }
    };

    fetchUserData();
  }, []);

  if (!loading && !error) {
    const isCurrentUser = user.data.id === data.user.id;
    return (
      <div>
        <h1 className="text-4xl font-bold py-2">{data.title}</h1>

        <span className="text-lg hover:underline hover:text-[#6B46C1]">
          <Link to={`/user/${data.user.id}/library`} className="flex gap-2">
            <img
              src={data.user.profilePhoto}
              alt="Profile"
              className="rounded-full w-6 h-6"
            ></img>
            {data.user.name}
            {isCurrentUser && <p>You made this deck!</p>}
          </Link>
        </span>
        <div className="py-4">
          <div className="border rounded-lg p-2 h-24 bg-gray-100">
            <h2 className="text-xl font-medium">{data.description}</h2>
          </div>
        </div>

        {data.cards.map((card) => (
          <p key={card.id} className="text-md font-medium py-2">
            {card.term},{card.definition}
          </p>
        ))}
      </div>
    );
  }
}
