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
        user: true,
      },
    });

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    const isCreator = deck.userId === req.session.user.id;

    const deckWithFavorites = await prisma.deck.findUnique({
      where: { id: deckId },
      include: {
        user: true, // Include the user associated with the deck
        cards: {
          orderBy: {
            createdAt: "asc", // Order cards by createdAt in ascending order
          },
        },
        favoriteDecks: isCreator
          ? {}
          : {
              // Include all favorite decks if user is creator, else include only user's favorite deck
              where: {
                userId: req.session.user.id,
              },
            },
      },
    });

    res.json(deckWithFavorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/decks/:deckId", isLoggedIn, async (req, res) => {
  const { deckId } = req.params;
  const { title, description } = req.body; // Destructure title and description directly

  try {
    const existingDeck = await prisma.deck.findUnique({
      where: { id: deckId },
      include: {
        user: true,
      },
    });

    if (!existingDeck) {
      return res.status(404).json({ message: "Deck not found" }); // Use status(404) instead of send(404)
    }

    if (existingDeck.user.id !== req.session.user.id) {
      return res.sendStatus(401);
    }

    const updatedDeck = await prisma.deck.update({
      where: { id: deckId },
      data: {
        title,
        description,
      },
      include: {
        user: true,
      },
    });

    res.json(updatedDeck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
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
      },
    });

    if (!card) {
      return res.status(404).json({ message: "Card not found." });
    }

    const deletedCard = await prisma.card.delete({
      where: {
        id: cardId,
      },
    });

    const deck = await prisma.deck.update({
      where: { id: card.deck.id },
      data: { editedAt: new Date() },
    });

    console.log(" Resource delted sucessfully", deletedCard);
    res.json({ id: cardId, deck });
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
        deck: true,
      },
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
      data: { editedAt: updatedCard.editedAt },
    });

    res.json(updatedCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

router.get("/cards/:deckId/matching", isLoggedIn, async (req, res) => {
  const { deckId } = req.params;
  const limit = parseInt(req.query.limit, 10) || 4;
  try {
    const existingDeck = await prisma.deck.findUnique({
      where: {
        id: deckId,
      },
      select: {
        cards: true,
      },
    });

    if (!existingDeck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    const terms = [];
    const tempCards = shuffleArray(existingDeck.cards).slice(0, limit);

    tempCards.forEach((card) => {
      terms.push({
        id: card.id,
        text: card.term,
        type: "term",
      });

      terms.push({
        id: card.id,
        text: card.definition,
        type: "definition",
      });
    });

    const cards = shuffleArray(terms);

    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/decks", isLoggedIn, async (req, res) => {
  const { userId, title, description, cards } = req.body;
  try {
    const newDeck = await prisma.deck.create({
      data: {
        userId: userId,
        title: title,
        description: description,
      },
    });

    for (const card of cards) {
      await prisma.card.create({
        data: {
          deckId: newDeck.id,
          term: card.term,
          definition: card.definition,
        },
      });
    }
    console.log("new deck created: ", newDeck);
    res.json(newDeck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/decks/:deckId", isLoggedIn, async (req, res) => {
  const { deckId } = req.params;
  try {
    const deck = await prisma.deck.findUnique({
      where: {
        id: deckId,
      },
    });

    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }
    const deletedDeck = await prisma.deck.delete({
      where: {
        id: deckId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
