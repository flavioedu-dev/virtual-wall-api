import express from "express"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"

// index.js
// async function main() {
//   const prisma = new PrismaClient()

//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//       },
//     });

//     console.log('Novo usuário criado:', newUser);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();


dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Initialized API")
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})