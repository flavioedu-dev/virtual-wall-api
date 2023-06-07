import { Router, Request, Response } from "express"
import { prisma } from "../database/db"

const router = Router()

router.get("/", async (req: Request, res: Response) => {
  const allUsers = await prisma.usuarios.findMany()
  res.json(allUsers)
})

export default router