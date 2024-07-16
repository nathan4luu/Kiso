import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { isLoggedIn } from "../index.js";

const prisma = new PrismaClient();
const router = Router();

router.get("/decks/:deckId", isLoggedIn, async (req, res) => {
  const { deckId } = req.params;

  try {
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
      include: {
        user: true, // Include the user associated with the deck
        cards: {
          orderBy: {
            createdAt: "asc", // Order cards by createdAt in ascending order
          },
        },
        FavoriteDeck: {
          where: {
            userId: req.session.user.id,
          },
        },
      },
    });

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    res.json(deck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/users/:userId/decks/created", isLoggedIn, async (req, res) => {
  const { userId } = req.params;

  const currentUser = req.session.user;

  if (currentUser.id !== userId) {
    res.sendStatus(401);
  } else {
    try {
      const decks = await prisma.deck.findMany({
        where: {
          userId: currentUser.id,
        },
        include: {
          user: true,
          cards: true,
        },
      });
      if (!decks) {
        return res.status(200).json([]);
      }
      res.json(decks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
});

router.get("/users/:userId/decks/favorites", isLoggedIn, async (req, res) => {
  const { userId } = req.params;

  const currentUser = req.session.user;

  if (currentUser.id !== userId) {
    res.sendStatus(401);
  } else {
    try {
      const favoriteDecks = await prisma.favoriteDeck.findMany({
        where: {
          userId: currentUser.id,
        },
        include: {
          deck: {
            include: {
              cards: true,
            },
          },
        },
      });
      if (!favoriteDecks) {
        return res.status(200).json([]);
      }
      res.json(favoriteDecks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
});

router.post("/cards", isLoggedIn, async (req, res) => {
  const data = req.body;
  try {
    const existingDeck = await prisma.deck.findUnique({
      where: {
        id: data.deckId,
      },
    });

    if (!existingDeck) {
      res.status(404).json({ message: "Deck not found" });
    }
    const newCard = await prisma.card.create({
      data: {
        id: data.newCardId,
        term: data.term,
        definition: data.definition,
        deckId: data.deckId,
      },
    });

    await prisma.deck.update({
      where: { id: data.deckId },
      data: { editedAt: new Date() },
    });

    res.json(newCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/cards/:cardId", isLoggedIn, async (req, res) => {
  const { cardId } = req.params;
  console.log(cardId);

  try {
    const card = await prisma.card.findUnique({
      where: { id: cardId },
      include: {
        deck: true,
      }
    });

    if (!card) {
      return res.status(404).json({ message: "Card not found." });
    }

    const deletedCard = await prisma.card.delete({
      where: {
        id: cardId,
      },
    });

    await prisma.deck.update({
      where: { id: card.deck.id },
      data: { editedAt: new Date() },
    });

    console.log(" Resource delted sucessfully", deletedCard);
    res
      .status(200)
      .json({ message: "Resource deleted successfully.", id: cardId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/cards/:cardId", isLoggedIn, async (req, res) => {
  const { cardId } = req.params;

  const data = req.body;

  try {
    const existingCard = await prisma.card.findUnique({
      where: { id: cardId },
      include: {
        deck: true
      }
    });

    if (!existingCard) {
      res.status(404).json({ message: "Card not found." });
    }

    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: {
        term: data.term,
        definition: data.definition,
      },
    });

    await prisma.deck.update({
      where: { id: existingCard.deck.id },
      data: { editedAt: new Date() },
    });

    res.json(updatedCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
