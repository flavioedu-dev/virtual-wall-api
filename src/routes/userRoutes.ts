import { Router, Request, Response } from "express"
import { IRequestUser } from "../middlewares/authToken"

// Controller
import { UserController } from "../controllers/UserController"
import { authToken } from "../middlewares/authToken"

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

router.get("/protected", authToken, (req: IRequestUser, res: Response) => {
  const id = req.userId
  res.status(200).json({ id: id })
})



export default router