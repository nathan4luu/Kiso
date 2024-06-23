import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/decks", async (req, res) => {
  const allDecks = await prisma.deck.findMany();
  res.json(allDecks);
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



export default router;
