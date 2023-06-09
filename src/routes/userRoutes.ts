import { Router, Request, Response } from "express"

// Controller
import { UserController } from "../controllers/UserController"

const router = Router()

router.get("/", async (req: Request, res: Response) => {
  const { statusCode, body } = await UserController.getAll()
  res.status(statusCode).json(body)
})

router.post("/register", async (req: Request, res: Response) => {
  const { statusCode, body } = await UserController.createUser(req.body)
  // Inserting token in cookies
  res.cookie("token", body, { httpOnly: true })
  res.status(statusCode).json(body)
})

router.post("/login", async (req: Request, res: Response) => {
  const { statusCode, body } = await UserController.loginUser(req.body)
  // Inserting token in cookies
  res.cookie("token", body, { httpOnly: true })
  res.status(statusCode).json({ message: "Authentication successful." })
})



export default router