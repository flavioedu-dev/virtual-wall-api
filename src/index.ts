import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { prisma } from "./database/db"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Initialized API")
})


prisma.$connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch((err) => {
  console.log("error: ", err)
})

