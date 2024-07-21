import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UNSAFE_ErrorResponseImpl } from "react-router-dom";

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
      const previousDeck = queryClient.getQueryData(["deck", editedDeckData.id]);
      if (previousDeck) {
        queryClient.setQueryData(["deck", editedDeckData.id], (oldDeck) => ({
          ...oldDeck,
          title: editedDeckData.title,
          description: editedDeckData.description,
          editedAt: editedDeckData.editedAt,
        }));
      }

      return { previousDeck }
    },
  });
};
