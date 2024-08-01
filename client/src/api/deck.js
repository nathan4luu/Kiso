import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

async function editDeck({ deckId, title, description }) {
  try {
    const response = await axios.put(
      `http://localhost:4040/api/decks/${deckId}`,
      {
        title: title,
        description: description,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("Error editing deck title/description: ", error);
    throw error;
  }
}

export const useEditDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editDeck,
    onSuccess: (editedDeckData) => {
      const previousDeck = queryClient.getQueryData([
        "deck",
        editedDeckData.id,
      ]);
      if (previousDeck) {
        queryClient.setQueryData(["deck", editedDeckData.id], (oldDeck) => ({
          ...oldDeck,
          title: editedDeckData.title,
          description: editedDeckData.description,
          editedAt: editedDeckData.editedAt,
        }));
      }

      return { previousDeck };
    },
  });
};

async function getShuffledCards({ queryKey }) {
  const [, deckId, limit] = queryKey;

  try {
    const response = await axios.get(
      `http://localhost:4040/api/cards/${deckId}/matching/`,
      {
        params: { limit }, // Use `params` to send query parameters
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting shuffled cards:", error.message || error);
    throw new Error("Failed to fetch shuffled cards.");
  }
}

export const useShuffledCards = (deckId, limit) => {
  return useQuery({
    queryKey: ["deck", deckId, limit],
    queryFn: getShuffledCards,
    refetchOnWindowFocus: false,
  });
};

async function createDeck({ userId, title, description, cards }) {
  try {
    const response = await axios.post(
      "http://localhost:4040/api/decks",
      {
        userId: userId,
        title: title,
        description: description,
        cards: cards,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("Error creating deck:", error);
    throw error;
  }
}

export const useCreateDeck = () => {
  const navigate= useNavigate();
  return useMutation({
    mutationFn: createDeck,
    onSuccess: (newDeckData) => {
      console.log(newDeckData.id)
      navigate(`/decks/${newDeckData.id}`)
    }
  })
}
