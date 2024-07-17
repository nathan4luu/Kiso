import {
  useMutation,
  QueryCache,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { createId } from "@paralleldrive/cuid2";

///////////////////
// CREATING CARD //
///////////////////
async function createCard({ newCardId, term, definition, deckId }) {
  try {
    const response = await axios.post(
      "http://localhost:4040/api/cards",
      {
        newCardId: newCardId,
        term: term,
        definition: definition,
        deckId: deckId,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("Error creating card:", error);
    throw error;
  }
}

export const useCreateCard = (deckId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCard,
    onSuccess: (newCardData) => {
      const previousDeck = queryClient.getQueriesData(["deck", deckId]);
      if (previousDeck) {
        queryClient.setQueryData(["deck", deckId], (oldDeck) => ({
          ...oldDeck,
          editedAt: newCardData.editedAt,
          cards: [...oldDeck.cards, { ...newCardData }],
        }));
      }
      return { previousDeck };
    },
  });
};

// deleting card
async function deleteCard({ cardId }) {
  try {
    const response = await axios.delete(
      `http://localhost:4040/api/cards/${cardId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("Error deleting card:", error);
    throw error;
  }
}

export const useDeleteCard = (deckId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCard,
    onSuccess: (data) => {
      const previousDeck = queryClient.getQueriesData(["deck", deckId]);
      if (previousDeck) {
        queryClient.setQueryData(["deck", deckId], (oldDeck) => ({
          ...oldDeck,
          editedAt: data.deck.editedAt,
          cards: oldDeck.cards.filter((card) => card.id !== data.id),
        }));
      }
      return { previousDeck };
    },
  });
};

// editing card
async function editCard({ cardId, term, definition }) {
  try {
    const response = await axios.put(
      `http://localhost:4040/api/cards/${cardId}`,
      {
        term: term,
        definition: definition,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("Error editing card:", error);
    throw error;
  }
}

export const useEditCard = (deckId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editCard,
    onSuccess: (editedCardData) => {
      const previousDeck = queryClient.getQueryData(["deck", deckId]);
      if (previousDeck) {
        queryClient.setQueryData(["deck", deckId], (oldDeck) => ({
          ...oldDeck,
          editedAt: editedCardData.editedAt,
          cards: oldDeck.cards.map((card) =>
            card.id === editedCardData.id ? editedCardData : card
          ),
        }));
      }

      return { previousDeck };
    },
  });
};
