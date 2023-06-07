import { Router, Request, Response } from "express"

// Controller
import { UserController } from "../controllers/UserController"

const router = Router()

router.get("/", async (req: Request, res: Response) => {
  const { statusCode, body } = await UserController.getAll()
  res.status(statusCode).json(body)
})

export default router