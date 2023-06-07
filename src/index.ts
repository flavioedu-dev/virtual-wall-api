import express, { Request, Response } from "express"
import dotenv from "dotenv"
import router from "./Router"
import { prisma } from "./database/db"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())

app.use("/", router)

app.get("/", (req: Request, res: Response) => {
  res.send("Initialized API")
})


prisma.$connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch((err) => {
  console.log("error: ", err)
})