import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { isLoggedIn } from "../index.js";

const prisma = new PrismaClient();
const router = Router();

router.get("/decks", async (req, res) => {
  const allDecks = await prisma.deck.findMany();
  res.json(allDecks);
});

router.get("/decks/:deckId", isLoggedIn, async (req, res) => {
  const { deckId } = req.params;

  try {
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
      include: {
        user: true,
        cards: true,
        FavoriteDeck: {
          where: {
            userId: req.session.user.id
          }
        }
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

router.get("users/:userId/decks", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const userDecks = await prisma.deck.findMany({
      where: {
        userId: userId,
      },

    });
    res.json(userDecks);
  } catch (error) {
    console.error("Error fetching user decks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
});

router.get("/users/:userId/decks/favorites", isLoggedIn, async (req, res) => {
  const { userId } = req.params;

  const currentUser = req.session.user;

  if (currentUser.id !== userId) {
    res.sendStatus(401);
  } 
  else {
    try {
      const favoriteDecks = await prisma.favoriteDeck.findMany({
        where: {
          userId: currentUser.id,
        },
        include: {
          deck: true,
        }
      });
      if (!favoriteDecks) {
        return res.status(200).json([]);
      }
      res.json(favoriteDecks);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Server error" });
    }
  }
});

export default router;
