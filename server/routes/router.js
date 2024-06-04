import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import auth from "./auth.js"

const prisma = new PrismaClient()
const router = Router()

router.use("/auth", auth)

export default router

