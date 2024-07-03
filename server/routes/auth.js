import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import googleAuth from "./authOptions/google.js";

const prisma = new PrismaClient();
const router = Router();

router.use("/google", googleAuth);





export default router;
