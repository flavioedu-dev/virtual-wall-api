import { prisma } from "../database/db"
import { usuarios } from "../models/User"

export const UserRepository = {
  async getAllUsers(): Promise<usuarios[]>{
    const allUsers = await prisma.usuarios.findMany()

    return allUsers
  }
}