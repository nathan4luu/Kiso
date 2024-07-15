import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getDeck({ queryKey }) {
  const [, deckId] = queryKey;
  try {
    const response = await axios.get(
      `http://localhost:4040/api/decks/${deckId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    } else {
      console.error(error);
      throw error;
    }
  }
}

export const useDeck = (deckId) => {
  return useQuery({
    queryKey: ["deck", deckId],
    queryFn: getDeck,
  });
};
